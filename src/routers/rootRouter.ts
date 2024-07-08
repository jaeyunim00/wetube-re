import express, { Request, Response, NextFunction } from "express";
import { getJoin, postJoin , getLogin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middleware/protector";

const rootRouter = express.Router();

rootRouter.get("/", (req: Request, res: Response, next: NextFunction) => home(req, res, next));

rootRouter.route("/join")
  .all(publicOnlyMiddleware)
  .get((req: Request, res: Response, next: NextFunction) => getJoin(req, res))
  .post((req: Request, res: Response, next: NextFunction) => postJoin(req, res));

rootRouter.route("/login")
  .all(publicOnlyMiddleware)
  .get((req: Request, res: Response, next: NextFunction) => getLogin(req, res))
  .post((req: Request, res: Response, next: NextFunction) => postLogin(req, res));

rootRouter.get("/search", (req: Request, res: Response, next: NextFunction) => search(req, res, next));

export default rootRouter;
