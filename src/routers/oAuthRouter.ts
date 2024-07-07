import express from "express"
import { callbackGithubLogin, startGithubLogin } from "../controllers/oAuthController";

const oAuthRouter = express.Router();

oAuthRouter.get("/github/start", startGithubLogin);
oAuthRouter.get("/github/callback", callbackGithubLogin);

export default oAuthRouter;