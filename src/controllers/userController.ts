import { Request, Response } from "express";
import User from "../models/User";
const bcrypt = require('bcrypt');

// 회원가입
export const getJoin = (req: Request, res: Response) => {
  res.render("join", {pageTitle: "create account"});
};

export const postJoin = async (req: Request, res: Response) => {
  const { name, username, email, password, repassword , location } = req.body;

  const pageTitle = "Join";

  const userNameExisit = await User.exists({ username });

  if(userNameExisit) {
    return res.render("join", {pageTitle: "join", errorMessage: "이미 존재하는 닉네임입니다."})
  };

  const emailExists = await User.exists({ username });
  
  if(emailExists) {
    return res.render("join", {pageTitle: "join", errorMessage: "이미 존재하는 이메일입니다."})
  };
  
  if(password !== repassword) {
    return res.render("join", {pageTitle: "join", errorMessage: "비밀번호가 서로 일치하지 않습니다."})
  };

  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    pateTitle: "upload Video";
  }

};

// 로그인
export const getLogin = (req: Request, res: Response) => {
  res.render("login", { pageTitle: "login" });
}

export const postLogin = async (req: any, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "login",
      errorMessage: "존재하지 않는 사용자"
    })
  }
  /************************중요**************************/
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "잘못된 비밀번호"
    })
  };
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
}


export const edit = (req: Request, res: Response) => {
  res.send("edit");
};


export const logout = (req: any, res: Response) => {
  req.session.destroy();
  return res.redirect("/");
}

export const see = (req: Request, res: Response) => {
  res.send("see user");
}
