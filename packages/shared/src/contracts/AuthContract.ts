// contract.ts

import { initContract } from "@ts-rest/core";
import { z } from "zod";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";
import { ContractName } from ".";

extendZodWithOpenApi(z);

const c = initContract();

const metadata = { openApiTags: ["AuthController"] };
const buildPath = (path: string) => `/auth${path}`;

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

/**
   * 
    description: "Refresh access token",
    summary: "Refresh access token",
    responses: {
      [HttpStatus.OK]: {
        description: "New access",
      },
    },
   */

export const AuthContract = c.router({
  login: {
    metadata,
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
    path: buildPath("/logout"),
    method: "POST",
    body: z.object({}),
    summary: "Logout user",
    description: "Logout user",
    responses: {
      204: z.void().openapi({
        description: "No content",
      }),
    },
  },
  refresh: {
    metadata,
    path: buildPath("/refresh"),
    method: "POST",
    body: z.object({}),
    summary: "Refresh access token",
    description: "Refresh access token",
    responses: {
      200: LoginResponse,
      401: z.object({
        message: z.string().openapi({
          example: "TODO!!!",
        }),
      }),
    },
  },
});
