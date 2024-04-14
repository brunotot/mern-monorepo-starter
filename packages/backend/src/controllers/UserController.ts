import { Request, Response } from "express";
import { Role } from "../config";
import { Autowired } from "../decorators/Autowired";
import { Controller } from "../decorators/Controller";
import { GetMapping } from "../decorators/GetMapping";
import { PostMapping } from "../decorators/PostMapping";
import { Use } from "../decorators/Use";
import { User } from "../form/UserForm";
import { UserService } from "../infrastructure/service/UserService";
import { validateForm } from "../middleware/validateForm";
import { verifyJWT } from "../middleware/verifyJWT";
import { verifyRoles } from "../middleware/verifyRoles";

@Controller("/users")
export class UserController {
  @Autowired() userService: UserService;

  @Use(verifyJWT(), verifyRoles(Role.ADMIN))
  @GetMapping()
  async findAll(_req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  @Use(validateForm(User))
  @PostMapping()
  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }
}
