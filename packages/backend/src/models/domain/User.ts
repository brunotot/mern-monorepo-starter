import { Role } from "@org/shared";
import { ObjectId } from "mongodb";
import z from "zod";

import { Swagger } from "@config";

export const User = z
  .object({
    _id: z.instanceof(ObjectId),
    username: z.string().openapi({ example: "john_doe" }),
    password: z.string().openapi({ example: "password" }),
    email: z.string().email().openapi({ example: "john.doe@mail.com" }),
    roles: z.array(Role).openapi({ example: [Role.enum.USER, Role.enum.ADMIN] }),
    refreshToken: z.array(z.string()),
  })
  .describe("User");

Swagger.getInstance().registerSchema("User", User);

export type User = z.infer<typeof User>;
