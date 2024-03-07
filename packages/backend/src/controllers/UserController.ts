import { Request, Response } from "express";
import { Autowired } from "../decorators/Autowired";
import { Injectable } from "../decorators/Injectable";
import { Route } from "../decorators/Route";
import { UserRepository } from "../infrastructure/repository/UserRepository";

@Injectable()
export class UserController {
  @Autowired() userRepository: UserRepository;

  @Route({ path: "/users", method: "get" })
  async findAll(_req: Request, res: Response) {
    const users = await this.userRepository.findAll();
    res.json(users);
  }

  @Route({ path: "/users", method: "post" })
  async create(req: Request, res: Response) {
    const user = await this.userRepository.create(req.body);
    res.status(201).json(user);
  }
}
