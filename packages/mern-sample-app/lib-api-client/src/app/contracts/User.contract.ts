import { initContract } from "@ts-rest/core";
import { routeCommonProps } from "./../../lib/@ts-rest";
import { z } from "zod";
import { JsonQueryParam, PaginationOptions, User, UserPageableResponseDto } from "@org/lib-commons";
import { RestErrorSchema } from "../../schemas/RestErrorSchema";
import { RestError500Schema } from "../../schemas/RestError500Schema";

const routeDefaults = routeCommonProps({
  groupName: "UserController",
  contextPath: "/users",
});

export const userContract = initContract().router({
  findAll: {
    ...routeDefaults("/findAll"),
    method: "GET",
    summary: "Get all users",
    description: `Get all users`,
    responses: {
      200: z.array(User).describe("Users"),
      401: RestErrorSchema.describe("Unauthorized"),
      //500: RestError500Schema,
    },
  },
  findOneByUsername: {
    ...routeDefaults("/findOneByUsername"),
    method: "GET",
    summary: "Get a user by id",
    description: "Get a user by id",
    query: z.object({
      username: z.string().openapi({ example: "brunotot" }),
    }),
    responses: {
      200: User,
      401: RestErrorSchema.describe("Unauthorized"),
      404: RestErrorSchema.describe("User not found"),
      500: RestError500Schema,
    },
  },
  findAllPaginated: {
    ...routeDefaults("/findAllPaginated"),
    method: "GET",
    summary: "Get all users",
    description: "Get all users",
    query: z.object({
      paginationOptions: JsonQueryParam(PaginationOptions),
    }),
    responses: {
      200: UserPageableResponseDto,
      500: RestError500Schema,
    },
  },
  createOne: {
    ...routeDefaults("/createOne"),
    method: "POST",
    summary: "Create a user",
    description: "Create a user",
    body: User,
    responses: {
      201: User,
      500: RestError500Schema,
    },
  },
  deleteByUsername: {
    ...routeDefaults("/deleteByUsername"),
    method: "DELETE",
    summary: "Delete User by username",
    description: "Delete User by username",
    body: z.object({
      username: z.string().openapi({ example: "brunotot" }),
    }),
    responses: {
      201: z.string(),
      500: RestError500Schema,
    },
  },
});
