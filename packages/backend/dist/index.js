var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import mongoose from "mongoose";
import MongoUser from "./domain/MongoUser"; // Adjust the path as necessary
import { User } from "./form/UserForm";
import { validateForm } from "./middleware/validateForm";
const app = express();
const PORT = process.env["PORT"] || 3001;
// Middleware to parse JSON bodies
app.use(express.json());
mongoose
    .connect(process.env["MONGODB_URI"] ||
    "mongodb://mongo:bbH5636fb3E4C-6GCdc-faCc2-HD5H2F@viaduct.proxy.rlwy.net:30052")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
app.get("/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield MongoUser.find(); // Fetch all users
        res.json(users); // Send users as JSON
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.post("/users", validateForm(User), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new MongoUser(req.body); // Create a new user
        //await user.save(); // Save the user
        res.status(201).json(user); // Send the user as JSON
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Internal Server Error");
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map