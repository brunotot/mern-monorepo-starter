import { Role } from "@org/shared";
import { Request, Response } from "express";
import HttpStatus from "http-status";
import { Autowired } from "../decorators/@Autowired";
import { Controller } from "../decorators/@Controller";
import { Use } from "../decorators/@Use";
import { GetMapping } from "../decorators/route/mapping/@GetMapping";
import { PostMapping } from "../decorators/route/mapping/@PostMapping";
import { UserService } from "../infrastructure/service/UserService";
import { withJwt } from "../middleware/withJwt";
import { withUserRoles } from "../middleware/withUserRoles";

@Controller("/users", {
  description: "User management",
})
export class UserController {
  @Autowired() userService: UserService;

  @Use(withJwt(), withUserRoles(Role.enum.ADMIN))
  @GetMapping("", {
    description: "Get all users",
    summary: "Get all users",
    responses: {
      [HttpStatus.OK]: {
        description: "List of users",
        content: {
          "": {
            schema: {},
          },
        },
      },
    },
  })
  async findAll(_req: Request, res: Response) {
    const users = await this.userService.findAll();
    res.json(users);
  }

  @PostMapping("", {
    description: "Create a user",
    summary: "Create a user",
    responses: {
      [HttpStatus.CREATED]: {
        description: "User created",
      },
    },
  })
  async create(req: Request, res: Response) {
    const user = await this.userService.create(req.body);
    res.status(201).json(user);
  }
}
