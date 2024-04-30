import { initContract, ContractNoBody } from "@ts-rest/core";
import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { buildPathFn, buildRouteMetadata } from "../../utils";

extendZodWithOpenApi(z);
const metadata = buildRouteMetadata("AuthController");
const buildPath = buildPathFn("auth");

export const LoginForm = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const LoginResponse = z
  .object({
    accessToken: z.string().openapi({
      example:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjI5MjIwNjI5LCJleHAiOjE2MjkyMjA3Mjl9.1",
    }),
  })
  .openapi({ title: "Access token" });

export const AuthContract = initContract().router({
  login: {
    metadata,
    strictStatusCodes: true,
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
    strictStatusCodes: true,
    path: buildPath("/logout"),
    method: "POST",
    body: z.object({}),
    summary: "Logout user",
    description: "Logout user",
    responses: {
      204: ContractNoBody,
    },
  },
  refresh: {
    metadata,
    strictStatusCodes: true,
    path: buildPath("/refresh"),
    method: "POST",
    body: z.object({}),
    summary: "Refresh access token",
    description: "Refresh access token",
    responses: {
      200: LoginResponse,
      403: ContractNoBody,
      401: z.object({
        message: z.string().openapi({
          example: "TODO!!!",
        }),
      }),
    },
  },
});
