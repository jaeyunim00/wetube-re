import express from "express"
import { callbacKakaoLogin, callbackGithubLogin, startGithubLogin, startKakaoLogin } from "../controllers/oAuthController";
import { publicOnlyMiddleware } from "../middleware/protector";

const oAuthRouter = express.Router();

oAuthRouter.get("/github/start", publicOnlyMiddleware ,startGithubLogin);
oAuthRouter.get("/github/callback", publicOnlyMiddleware ,callbackGithubLogin);

oAuthRouter.get("/kakao/start", publicOnlyMiddleware , startKakaoLogin);
oAuthRouter.get("/kakao/callback", publicOnlyMiddleware , callbacKakaoLogin);

export default oAuthRouter;