import express, { Request, Response } from "express";
import { join, login } from "../controllers/userController";
import { trending } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", (req: Request, res: Response) => trending(req, res));
globalRouter.get("/join", (req: Request, res: Response) => join(req, res));
globalRouter.get("/login", (req: Request, res: Response) => login(req, res));

export default globalRouter;
