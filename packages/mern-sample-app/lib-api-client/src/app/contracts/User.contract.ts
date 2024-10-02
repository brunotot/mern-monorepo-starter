import { z } from "@org/lib-commons";

import { User } from "../models";
import { PaginationOptionsQueryParam } from "../utils/common-models";
import * as errors from "../utils/error-responses";
import * as responses from "../utils/valid-responses";
import { routeCommonProps, zodResponse, initContract } from "./../../lib/@ts-rest";

const routeDefaults = routeCommonProps({
  groupName: "Users",
  contextPath: "/users",
});

export const userContract = initContract().router({
  findAll: {
    ...routeDefaults({
      path: "/findAll",
      secured: true,
    }),
    method: "GET",
    summary: "Find all users",
    description: `Finds all existing users`,
    responses: {
      200: zodResponse(z.array(User), "List of all users"),
      401: zodResponse(errors.RestErrorResponse401, "Unauthorized"),
      403: zodResponse(errors.RestErrorResponse403, "Forbidden"),
      500: zodResponse(errors.RestErrorResponse500, "Unhandled server error"),
    },
  },
  findOneByUsername: {
    ...routeDefaults({
      path: "/findOneByUsername",
      secured: true,
    }),
    method: "GET",
    summary: "Find user by username",
    description:
      "Finds a single user whose username matches the one provided in 'username' query parameter.",
    query: z.object({
      username: z.string().openapi({ example: "admin" }),
    }),
    responses: {
      200: zodResponse(User, "Single user"),
      401: zodResponse(errors.RestErrorResponse401, "Unauthorized"),
      403: zodResponse(errors.RestErrorResponse403, "Forbidden"),
      404: zodResponse(errors.RestErrorResponse404, "User not found"),
      500: zodResponse(errors.RestErrorResponse500, "Unhandled server error"),
    },
  },
  findAllPaginated: {
    ...routeDefaults({
      path: "/findAllPaginated",
      secured: true,
    }),
    method: "GET",
    summary: "Find paginated users",
    description: "Finds paginated users",
    query: z.object({
      paginationOptions: PaginationOptionsQueryParam,
    }),
    responses: {
      200: zodResponse(responses.TypedPaginationResponse(User), "Paginated users"),
      401: zodResponse(errors.RestErrorResponse401, "Unauthorized"),
      403: zodResponse(errors.RestErrorResponse403, "Forbidden"),
      500: zodResponse(errors.RestErrorResponse500, "Unhandled server error"),
    },
  },
});
