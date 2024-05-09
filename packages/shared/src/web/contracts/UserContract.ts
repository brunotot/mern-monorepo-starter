import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { ZOD_ERROR_ANY, buildDefaultResponses, buildPathFn, buildRouteMetadata } from "../../utils";
import { User } from "../../models";

const metadata = buildRouteMetadata("UserController");
const defaultResponses = buildDefaultResponses();
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

export const UserPageableResponseDto = PageableResponseDto(User);

export const UserContract = initContract().router({
  findOne: {
    metadata,
    strictStatusCodes: true,
    path: buildPath("/:id"),
    method: "GET",
    summary: "Get a user by id",
    description: "Get a user by id",
    pathParams: z.object({
      id: z.string().openapi({ example: "brunotot" }),
    }),
    responses: {
      200: User,
      404: ZOD_ERROR_ANY.describe("User not found"),
      ...defaultResponses,
    },
  },
  pagination: {
    metadata,
    strictStatusCodes: true,
    path: buildPath(),
    method: "GET",
    summary: "Get all users",
    description: "Get all users",
    query: z.object({
      page: z.number().default(0),
      limit: z.number().default(10),
      sort: z.string().default(""),
      search: z.string().default(""),
    }),
    responses: {
      200: UserPageableResponseDto,
      ...defaultResponses,
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
      ...defaultResponses,
    },
  },
});
