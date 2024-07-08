export const protectorMiddleWare = (req: any, res: any, next: any) => {
  console.log(req.session.loggedIn)
  if (req.session.loggedIn) {
    next();
  } else {
    return res.redirect("/login");
  }
}

export const publicOnlyMiddleware = (req: any, res: any, next: any) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
}