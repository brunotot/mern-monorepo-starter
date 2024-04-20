import { Role } from "@org/shared";
import z from "zod";
import { convertZodToMongooseModel } from "../config";

export const User = z.object({
  username: z.string().openapi({ example: "john_doe" }),
  password: z.string().openapi({ example: "password" }),
  email: z.string().email().openapi({ example: "john.doe@mail.com" }),
  roles: z.array(Role).openapi({ example: [Role.enum.USER] }),
  refreshToken: z.array(z.string()),
});

export type User = z.infer<typeof User>;

export const MongoUser = convertZodToMongooseModel("User", User);
