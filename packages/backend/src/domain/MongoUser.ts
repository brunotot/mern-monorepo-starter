import { Role } from "@org/shared";
import mongoose from "mongoose";
import type { User } from "../form/UserForm";

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  roles: {
    type: [String],
    enum: Role,
    default: [Role.USER],
    required: true,
  },
  refreshToken: [String],
});

const MongoUser = mongoose.model("User", userSchema);

export default MongoUser;
