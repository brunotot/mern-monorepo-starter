import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
});
const MongoUser = mongoose.model("User", userSchema);
export default MongoUser;
//# sourceMappingURL=MongoUser.js.map