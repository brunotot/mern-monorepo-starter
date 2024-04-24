import { Role } from "@org/shared";
import type { Request, Response } from "express";
import HttpStatus from "http-status";

import { Swagger } from "@config";
import {
  type PaginationOptions,
  withJwt,
  withPaginableParams,
  withUserRoles,
  type UserService,
} from "@infrastructure";
import { Autowired, Controller, Use, PostMapping, GetMapping } from "@decorators";
import { PageableResponseDto, User } from "@domain";

@Controller("/users", { description: "User management" })
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

  @Use(withPaginableParams())
  @GetMapping("/pagination")
  async pagination(_req: Request, res: Response) {
    const paginationOptions = res.locals.paginationOptions as PaginationOptions;
    const paginatedResult = await this.userService.search(paginationOptions);
    res.json(paginatedResult);
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
