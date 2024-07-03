import { Request, Response } from "express";

export const join = (req: Request, res: Response) => {
  res.send("join")
};

export const edit = (req: Request, res: Response) => {
  res.send("edit");
};

export const remove = (req: Request, res: Response) => {
  res.send("remove")
};

export const login = (req: Request, res: Response) => {
  res.send("Login");
}

export const logout = (req: Request, res: Response) => {
  res.send("Logout");
}

export const see = (req: Request, res: Response) => {
  res.send("see user");
}
