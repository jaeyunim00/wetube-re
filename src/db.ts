import mongoose from "mongoose";
require("dotenv").config();

const dbUrl = process.env.DB_URL as string;

mongoose.connect(dbUrl)
  .catch((error) => {
  console.error("DB Error", error);
});

const db = mongoose.connection;

const handleOpen = () => {
  console.log("🆗 connected to DB");
};

const handleError = (error: any) => {
  console.log("DB Error", error);
};

db.on("error", handleError);
db.once("open", handleOpen);
