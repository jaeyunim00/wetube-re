import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db = mongoose.connection;

const handleOpen = () => {
  console.log("🆗 connected to DB");
}

const handleError = (error: any) => {
  console.log("⚠️ DB Error", error);
}

db.on("error", (error) => console.log("DB Error", error));
db.once("open", handleOpen);