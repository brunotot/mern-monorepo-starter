import { z } from "@org/lib-commons";
import { initContract } from "@ts-rest/core";

import { UserPaginationResultDto } from "../dto";
import {
  RestErrorSchema,
  RestError500Schema,
  JsonQueryParam,
  PaginationOptions,
  User,
} from "../models";
import { routeCommonProps } from "./../../lib/@ts-rest";

const routeDefaults = routeCommonProps({
  groupName: "Users",
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
      200: UserPaginationResultDto,
      500: RestError500Schema,
    },
  },
});
