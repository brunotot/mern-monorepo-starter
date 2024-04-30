import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { Role, buildPathFn, buildRouteMetadata } from "../../utils";

extendZodWithOpenApi(z);
const metadata = buildRouteMetadata("UserController");
const buildPath = buildPathFn("users");

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

export const UserContract = initContract().router({
  findAll: {
    metadata,
    strictStatusCodes: true,
    path: buildPath(),
    method: "GET",
    summary: "Get all users",
    description: "Get all users",
    responses: {
      200: UserPageableResponseDto,
    },
  },
  pagination: {
    metadata,
    strictStatusCodes: true,
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
    strictStatusCodes: true,
    path: buildPath(),
    method: "POST",
    summary: "Create a user",
    description: "Create a user",
    body: User,
    responses: {
      201: User,
    },
  },
});
