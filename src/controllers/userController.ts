import { Request, Response } from "express";
import User from "../models/User";
import Video from "../models/Video";
const bcrypt = require('bcrypt');

// 회원가입
export const getJoin = (req: Request, res: Response) => {
  res.render("join", {pageTitle: "create account"});
};

export const postJoin = async (req: Request, res: Response) => {
  const { name, username, email, password, repassword , location } = req.body;

  const userNameExisit = await User.exists({ username });

  if(userNameExisit) {
    return res.render("join", {pageTitle: "join", errorMessage: "이미 존재하는 닉네임입니다."})
  };

  const emailExists = await User.exists({ email });
  
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


export const getEdit = (req: any, res: Response) => {
  res.render("edit-profile", {pageTitle: "edit profile"});
};

export const postEdit = async (req: any, res: Response) => {
  const { name, email, username, location } = req.body;
  const { _id, avatarUrl } = req.session.user;

  // 프로필이미지
  const file = req.file;

  if (req.session.user.username !== username) {
    const userNameExisit = await User.exists({ username });
    
    if(userNameExisit) {
      return res.render("edit-profile", {pageTitle: "프로팔 수정", errorMessage: "이미 존재하는 닉네임입니다."})
    };
  }

  if (req.session.user.email !== email) {
    const emailExists = await User.exists({ email });
    
    if(emailExists) {
      return res.render("edit-profile", {pageTitle: "프로필 수정", errorMessage: "이미 존재하는 이메일입니다."})
    };
  }


  const updatedUser = await User.findByIdAndUpdate(_id, {
    avatarUrl: file ? file.path : avatarUrl,
    name,
    email,
    username,
    location,
  }, { new: true });
  
  req.session.user = updatedUser;

  return res.redirect("/users/edit");
};


export const logout = (req: any, res: Response) => {
  req.session.destroy();
  return res.redirect("/");
}

export const getChangePassword = (req: any, res: Response) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }

  return res.render("users/change-password", { pageTitle: "비밀번호 변경" });
}

export const postChangePassword = async (req: any, res: Response) => {
  const { _id } = req.session.user;
  const { password_old, password_new, password_new_confirm } = req.body;
  
  const user: any = await User.findById(_id);

  const ok = await bcrypt.compare(password_old, user.password);

  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "비밀번호 변경",
      errorMessage: "비밀번호가 틀렸습니다."
    })
  }

  if (password_new === password_old) {
    return res.status(400).render('users/change-password', {
    pageTitle: "비밀번호 변경",
    errorMessage: '비밀번호가 그대로입니다.',
    });
  }

  if (password_new !== password_new_confirm) {
    return res.status(400).render("users/change-password",
      {
        pageTitle: "비밀번호 변경",
        errorMessage: "비밀번호가 일치하지 않습니다."
      }
    )
  }

  user.password = password_new;
  await user.save();

  req.session.destroy();
  return res.redirect('/login');
}

export const see = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id).populate("videos");

  if (!user) {
    return res.status(404).render("error");
  }
  
  return res.render("users/profile", {
    pageTitle: user.username,
    user,
  });
}

