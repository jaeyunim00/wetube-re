require("dotenv").config()

import express, { Request, Response, NextFunction } from 'express';
var morgan = require('morgan');
var session = require('express-session')
import MongoStore from 'connect-mongo';

// Router
import rootRouter from './routers/rootRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';
import { localsMiddleware } from './middleware/locals';

// mongo
const MONGO_URI = process.env.DB_URL;

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger)
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
  })
)

app.use(localsMiddleware);

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// 404 핸들러
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.render("error", {
    pageTitle: "Page Not Found",
    message: "The page you are looking for does not exist.",
    error: {}
  });
});

// 에러 핸들러
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.render("error", {
    pageTitle: "Error",
    message: err.message,
    error: app.get("env") === "development" ? err : {}
  });
});


export default app;


