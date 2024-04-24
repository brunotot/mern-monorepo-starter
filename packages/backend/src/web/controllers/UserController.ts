import { Role } from "@org/shared";
import type { Request, Response } from "express";
import HttpStatus from "http-status";

import type { MongoSort, PaginationOptions, UserService } from "@internal";
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

  @GetMapping("/pagination")
  async pagination(req: Request, res: Response) {
    const buildPaginationOptions = (req: Request): PaginationOptions => {
      const query = req.query;
      const page = query.page ? parseInt(query.page as string) : 0;
      const limit = query.limit ? parseInt(query.limit as string) : 10;
      const sort = query.sort
        ? (query.sort as string).split(",").map(value => value.split("|"))
        : [];
      const textSearch = (query.search as string) ?? "";
      return {
        filters: {},
        sort: sort as MongoSort,
        page,
        limit,
        search: {
          fields: ["username", "email"],
          regex: textSearch,
        },
      };
    };

    const paginationOptions = buildPaginationOptions(req);
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
