import "./db"

import express, { Request, Response } from 'express';

// Router
import globalRouter from './routers/globalRouter';
import videoRouter from './routers/videoRouter';
import userRouter from './routers/userRouter';

var morgan = require('morgan')
 
const app = express();
const logger = morgan("dev");
const port = 3000;

const handleListening = () => {
  console.log(`🆗 open at http://localhost:${port}`);
}

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger)
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

app.listen(port, handleListening);


