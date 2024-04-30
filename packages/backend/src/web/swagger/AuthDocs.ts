import { type AuthController } from "@web/controllers/AuthController";
import { type ApiDocs } from "./index";

export const AuthDocs = {
  login: {
    description: "Login",
    summary: "Login",
    responses: {
      "200": {
        description: "User logged in",
        schema: {
          $ref: "#/definitions/User",
        },
      },
    },
  },
  logout: {
    description: "Logout",
    summary: "Logout",
    responses: {
      "200": {
        description: "User logged out",
      },
    },
  },
  refresh: {
    description: "Refresh token",
    summary: "Refresh token",
    responses: {
      "200": {
        description: "Access token",
        schema: {
          $ref: "#/definitions/User",
        },
      },
    },
  },
} satisfies ApiDocs<typeof AuthController>;
