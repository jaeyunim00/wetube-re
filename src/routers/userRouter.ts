import express, { Request, Response } from "express";
import { edit, remove, logout, see } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", (req: Request, res: Response) => see(req, res));
userRouter.get("/logout", (req: Request, res: Response) => logout(req, res));
userRouter.get("/edit", (req: Request, res: Response) => edit(req, res));
userRouter.get("/remove", (req: Request, res: Response) => remove(req, res));

export default userRouter;
