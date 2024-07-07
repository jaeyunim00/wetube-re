import { Request, Response } from "express"
import { request } from "http";
import User from "../models/User";

export const startGithubLogin = (req: Request, res: Response) => {
  const config: any = {
    client_id: process.env.GITHUB_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  }

  const params = new URLSearchParams(config).toString();
  const baseUrl = `https://github.com/login/oauth/authorize`
  const finalUrl = `${baseUrl}?${params}`;

  return res.redirect(finalUrl);
}

export const callbackGithubLogin = async (req: any, res: Response) => {
  const config: any = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHBU_SECRET,
    code: req.query.code,
  }
  const baseUrl = "https://github.com/login/oauth/access_token"
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  const tokenRequest = await (await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    }
  })).json();

  if ("access_token" in tokenRequest) {
    // accessapi
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com"
    const userData = await (await fetch(`${apiUrl}/user`, {
      headers: {
        Authorization: `token ${access_token}`
      }
    })).json();
    console.log(userData);
    const emailData = await (await fetch(`${apiUrl}/user/emails`, {
      headers: {
        Authorization: `token ${access_token}`
      }
    })).json();
    const emailObj = emailData.find((email: any) => email.primary === true && email.verified === true);

    if (!emailObj) {
      return res.redirect("/login");
    }

    let user = await User.findOne({
      email: emailObj.email
    });

    if (!user) {
      user = await User.create({
        avatarUrl: userData.avatar_url,
        name : userData.name? userData.name : "Unknown",
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true,
        location: userData.location,
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");

  } else {
    console.log("err");
    return res.redirect("/login")
  }

}