import { Role } from "@org/shared";
import { Request, Response } from "express";
import { Autowired } from "../decorators/Autowired";
import { Controller } from "../decorators/Controller";
import { GetMapping } from "../decorators/GetMapping";
import { PostMapping } from "../decorators/PostMapping";
import { Use } from "../decorators/Use";
import { UserService } from "../infrastructure/service/UserService";
import { withJwt } from "../middleware/withJwt";
import { withUserRoles } from "../middleware/withUserRoles";

@Controller("/users")
export class UserController {
  @Autowired() userService: UserService;

  @Use(withJwt(), withUserRoles(Role.ADMIN))
  @GetMapping()
  async findAll(_req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  @PostMapping()
  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }
}
