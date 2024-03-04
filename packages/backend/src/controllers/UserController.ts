import { inject } from "../config";
import { RouteHandler } from "../routes/Route";

export class UserController {
  public userRepository = inject("userRepository");

  constructor() {}

  findAll: RouteHandler = async (req, res) => {
    try {
      const users = await this.userRepository.findAll();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).send("Internal Server Error");
    }
  };

  create: RouteHandler = async (req, res) => {
    try {
      const user = await this.userRepository.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Internal Server Error");
    }
  };
}
