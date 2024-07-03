import express, { Request, Response } from "express";
import { watch, getEdit, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit")
  .get((req: Request, res: Response) => getEdit(req, res))
  .post((req: Request, res: Response) => postEdit(req, res));

export default videoRouter;
