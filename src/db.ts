import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube")
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
