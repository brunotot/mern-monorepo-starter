import { initContract } from "@ts-rest/core";
import { z } from "zod";

import { User } from "./User.domain";
import { JsonQueryParam, PaginationOptions, UserPageableResponseDto } from "./User.typedef";
import {
  routeCommonConfigFactory,
  ZOD_ERROR_500,
  ZOD_ERROR_ANY,
} from "../../config/Contract.config";

const routeDefaults = routeCommonConfigFactory({
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
      401: ZOD_ERROR_ANY.describe("Unauthorized"),
      //500: ZOD_ERROR_500,
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
      401: ZOD_ERROR_ANY.describe("Unauthorized"),
      404: ZOD_ERROR_ANY.describe("User not found"),
      500: ZOD_ERROR_500,
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
      500: ZOD_ERROR_500,
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
      500: ZOD_ERROR_500,
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
      500: ZOD_ERROR_500,
    },
  },
});
