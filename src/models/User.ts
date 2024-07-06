import mongoose, { Document, Schema } from "mongoose";
const bcrypt = require('bcrypt');

export interface IUser extends Document {
  email: string,
  username: string,
  password: string,
  name: string,
  location: string,
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: String,
});

userSchema.pre<IUser>("save", async function (next) {
  // 비밀번호 필드가 수정되지 않았다면, 해싱을 건너뜀.
  // 사용자가 프로필을 업데이트하는 경우..!! 비밀번호 안바꾸면
  // 굳이 해싱할 필요 X - 무결성 + 효율송
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);

  next();
})

const User = mongoose.model("User", userSchema);

export default User;