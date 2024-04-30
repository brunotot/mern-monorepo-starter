import { type UserController } from "@web/controllers/UserController";
import { type ApiDocs } from "./index";

export const UserDocs = {
  pagination: {
    description: "Get all users",
    summary: "Get all users",
    responses: {
      "200": {
        description: "Paginated list of users",
        schema: {
          $ref: "#/definitions/UserPageableResponseDto",
        },
      },
    },
  },
  /*findAll: {
    description: "Get all users",
    summary: "Get all users",
    responses: {
      "200": {
        description: "Paginated list of users",
        schema: {
          $ref: "#/definitions/UserPageableResponseDto",
        },
      },
    },
  },*/
  create: {
    description: "Create a user",
    summary: "Create a user",
    responses: {
      "201": {
        description: "User created",
      },
    },
  },
} satisfies ApiDocs<typeof UserController>;
