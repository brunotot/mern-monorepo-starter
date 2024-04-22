import { Role } from "@org/shared";
import type { Request, Response } from "express";
import HttpStatus from "http-status";

import type { UserService } from "@internal";
import {
  Autowired,
  Controller,
  GetMapping,
  PageableResponseDto,
  PostMapping,
  Swagger,
  Use,
  User,
  withJwt,
  withUserRoles,
} from "@internal";

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
        content: Swagger.getInstance().buildSwaggerBody(PageableResponseDto(User)).content,
      },
    },
  })
  async findAll(_req: Request, res: Response) {
    const users = await this.userService.findAll();
    const pageableResponse = users;
    res.json(pageableResponse);
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
