import { initContract, ContractNoBody } from "@ts-rest/core";
import { z } from "zod";
import { ZOD_ERROR_ANY, buildDefaultResponses, buildPathFn, buildRouteMetadata } from "../../utils";

const metadata = buildRouteMetadata("AuthController");
const buildPath = buildPathFn("auth");
const defaultResponses = buildDefaultResponses();

export const LoginForm = z.object({
  username: z.string().min(1).openapi({ example: "john-doe" }),
  password: z.string().min(1).openapi({ example: "x8aQ1m7?!X" }),
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
      200: LoginResponse.describe("Access token"),
      400: ZOD_ERROR_ANY.describe("Validation error"),
      401: ZOD_ERROR_ANY.describe("Unauthorized"),
      ...defaultResponses,
    },
  },
  logout: {
    metadata,
    strictStatusCodes: true,
    path: buildPath("/logout"),
    method: "POST",
    body: ContractNoBody,
    summary: "Logout user",
    description: "Logout user",
    responses: {
      204: ContractNoBody,
      ...defaultResponses,
    },
  },
  refresh: {
    metadata,
    strictStatusCodes: true,
    path: buildPath("/refresh"),
    method: "POST",
    body: ContractNoBody,
    summary: "Refresh access token",
    description: "Refresh access token",
    headers: z.object({
      authentication: z.string(),
    }),
    responses: {
      200: LoginResponse,
      401: ZOD_ERROR_ANY.describe("Unauthorized"),
      403: ZOD_ERROR_ANY.describe("Forbidden"),
      ...defaultResponses,
    },
  },
});
