import { Request, Response } from "express"
import User from "../models/User";
import { URLSearchParams } from "url";

// 랜덤 닉네임 생성기
const getRandomNickname = require('@woowa-babble/random-nickname').getRandomNickname;

// GITHUB 로그인
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

// KAKAO 로그인
export const startKakaoLogin = async (req: Request, res: Response) => {
  const config:any = {
    client_id: process.env.KAKAO_CLIENT,
    response_type: "code",
    redirect_uri: process.env.KAKAO_REDIRECT_URI,
    scope: "profile_nickname,profile_image,account_email",
  }
  const params = new URLSearchParams(config).toString();
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const finalUrl = `${baseUrl}?${params}`;
  res.redirect(finalUrl);
}

export const callbacKakaoLogin = async (req: any, res: Response) => {
  const config: any = {
    grant_type: "authorization_code",
    code: req.query.code,
    client_id: process.env.KAKAO_CLIENT,
    redirect_uri: process.env.KAKAO_REDIRECT_URI
  }

  const baseUrl = "https://kauth.kakao.com/oauth/token"
  const params = new URLSearchParams(config).toString();
  
  const finalUrl = `${baseUrl}?${params}`;

  
  const tokenRequest = await (await fetch(finalUrl, {
    method: "POST",
    headers: {
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  })).json();

  if ("access_token" in tokenRequest) {
    const ACCESS_TOKEN = tokenRequest.access_token;
    const api_url = "https://kapi.kakao.com/v2/user/me";
    
    const USER_INFO = await (await fetch(api_url, {
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    })).json()

    const type = 'animals'; // animals, heroes, characters, monsters
    const randomNickname = getRandomNickname(type);

    let user = await User.findOne({
      email: USER_INFO.kakao_account.email
    });

    if (!user) {  
      user = await User.create({
        avatarUrl: USER_INFO.kakao_account.profile.profile_image_url,
        name: USER_INFO.kakao_account.profile.nickname,
        username: randomNickname,
        email: USER_INFO.kakao_account.email,
        password: "",
        socialOnly: true,
        location: "",
      })
    }
  
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");

  } else {
    console.log("err");
    return res.redirect("/login");
  }
}