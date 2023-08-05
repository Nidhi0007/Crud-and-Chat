import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/user.interface";
import * as bcrypt from "bcrypt";
const UserSchema: Schema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);
UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};
export default mongoose.model<IUser>("User", UserSchema);
