import express, { Request, Response, NextFunction } from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController";
import { protectorMiddleWare } from "../middleware/protector";

const videoRouter = express.Router();

videoRouter.route("/upload")
  .all(protectorMiddleWare)
  .get((req: Request, res: Response, next: NextFunction) => getUpload(req, res))
  .post((req: Request, res: Response, next: NextFunction) => postUpload(req, res, next));

videoRouter.get("/:id", (req: Request, res: Response, next: NextFunction) => watch(req, res, next));

videoRouter.route("/:id/edit")
  .all(protectorMiddleWare)
  .get((req: Request, res: Response, next: NextFunction) => getEdit(req, res, next))
  .post((req: Request, res: Response, next: NextFunction) => postEdit(req, res, next));

videoRouter.route("/:id/delete")
  .all(protectorMiddleWare)
  .get((req: Request, res: Response, next: NextFunction) => deleteVideo(req, res, next))

export default videoRouter;
