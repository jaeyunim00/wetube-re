import express, { Request, Response, NextFunction } from "express";
import { join, login } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", (req: Request, res: Response, next: NextFunction) => home(req, res, next));
globalRouter.get("/join", (req: Request, res: Response, next: NextFunction) => join(req, res));
globalRouter.get("/login", (req: Request, res: Response, next: NextFunction) => login(req, res));
globalRouter.get("/search", (req: Request, res: Response, next: NextFunction) => search(req, res, next));

export default globalRouter;
