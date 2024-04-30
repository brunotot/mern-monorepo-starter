// contract.ts

import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { Role } from "../utils";

extendZodWithOpenApi(z);

const c = initContract();

const metadata = { openApiTags: ["UserController"] };
const buildPath = (path: string) => `/user${path}`;

/*import { Role } from "@org/shared";
import type { Request, Response } from "express";
import HttpStatus from "http-status";
import { Swagger } from "@config";
import { Autowired, Controller, Use, PostMapping, GetMapping } from "@decorators";
import { type PaginationOptions, UserPageableResponseDto } from "@models";
import { withJwt, withPaginableParams, withUserRoles, type UserService } from "@infrastructure";

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
        content: Swagger.getInstance().buildSwaggerBody(UserPageableResponseDto).content,
      },
    },
  })
  async findAll(_req: Request, res: Response) {
    const users = await this.userService.findAll();
    const pageableResponse = users;
    res.json(pageableResponse);
  }

  @Use(withPaginableParams())
  @GetMapping("/pagination", {
    parameters: [
      {
        in: "query",
        name: "page",
        schema: { type: "integer" },
      },
    ],
  })
  async pagination(_req: Request, res: Response) {
    const paginationOptions = res.locals.paginationOptions as PaginationOptions;
    const paginatedResult = await this.userService.search(paginationOptions);
    res.json(paginatedResult);
    //res.sendResponse(200, "UserPageableResponseDto", paginatedResult)
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
}*/

/*
export const AuthContract = c.router({
  login: {
    metadata,
    path: buildPath("/login"),
    method: "POST",
    summary: "Login user",
    description: "Login user",
    body: LoginForm,
    responses: {
      200: LoginResponse,
      401: z.object({
        message: z.string().openapi({
          example: "TODO!!!",
        }),
      }),
    },
  },
  logout: {
    metadata,
    path: buildPath("/logout"),
    method: "POST",
    body: z.object({}),
    summary: "Logout user",
    description: "Logout user",
    responses: {
      204: z.void().openapi({
        description: "No content",
      }),
    },
  },
  refresh: {
    metadata,
    path: buildPath("/refresh"),
    method: "POST",
    body: z.object({}),
    summary: "Refresh access token",
    description: "Refresh access token",
    responses: {
      200: LoginResponse,
      401: z.object({
        message: z.string().openapi({
          example: "TODO!!!",
        }),
      }),
    },
  },
});


*/

const BasePageableResponseDto = z
  .object({
    data: z.array(z.any()),
    totalPages: z.number().openapi({ example: 75 }),
    totalElements: z.number().openapi({ example: 741 }),
    rowsPerPage: z.number().openapi({ example: 10 }),
    page: z.number().openapi({ example: 0 }),
  })
  .describe("PageableResponseDto");

export function PageableResponseDto<T extends z.AnyZodObject>(schema: T) {
  return BasePageableResponseDto.extend({
    data: z.array(schema),
  })
    .describe("")
    .openapi({ title: `${PageableResponseDto.name}(${schema.description})` });
}

export type PaginationResult<T> = {
  data: T[];
  totalPages: number;
  totalElements: number;
  rowsPerPage: number;
  page: number;
};

export const User = z
  .object({
    _id: z.string().optional(),
    username: z.string().openapi({ example: "john_doe" }),
    password: z.string().openapi({ example: "password" }),
    email: z.string().email().openapi({ example: "john.doe@mail.com" }),
    roles: z.array(Role).openapi({ example: [Role.enum.USER, Role.enum.ADMIN] }),
    refreshToken: z.array(z.string()),
  })
  .describe("User");

export const UserPageableResponseDto = PageableResponseDto(User);

export type User = z.infer<typeof User>;

export const UserContract = c.router({
  findAll: {
    metadata,
    path: buildPath(""),
    method: "GET",
    summary: "Get all users",
    description: "Get all users",
    responses: {
      200: UserPageableResponseDto,
    },
    strictStatusCodes: true,
  },
  pagination: {
    metadata,
    path: buildPath("/pagination"),
    method: "GET",
    summary: "Get all users",
    description: "Get all users",
    responses: {
      200: UserPageableResponseDto,
    },
  },
  create: {
    metadata,
    path: buildPath("/"),
    method: "POST",
    summary: "Create a user",
    description: "Create a user",
    body: User,
    responses: {
      201: User,
    },
  },
});
