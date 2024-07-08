import express, { Request, Response } from "express";
import { getChangePassword, getEdit, logout, postChangePassword, postEdit, see } from "../controllers/userController";
import { protectorMiddleWare } from "../middleware/protector";

const userRouter = express.Router();

userRouter.route("/edit")
  .all(protectorMiddleWare)
  .get((req: Request, res: Response) => getEdit(req, res))
  .post((req: any, res: Response) => postEdit(req, res))

userRouter.route("/change-password")
  .all(protectorMiddleWare)
  .get((req: Request, res: Response) => getChangePassword(req, res))
  .post((req: any, res: Response) => postChangePassword(req, res))

userRouter.get("/logout", protectorMiddleWare ,(req: Request, res: Response) => logout(req, res));
userRouter.get("/:id", (req: Request, res: Response) => see(req, res));



export default userRouter;
