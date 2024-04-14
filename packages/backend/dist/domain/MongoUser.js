import mongoose from "mongoose";
import { Role } from "../config/vars/userRoles";
const userSchema = new mongoose.Schema({
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
//# sourceMappingURL=MongoUser.js.map