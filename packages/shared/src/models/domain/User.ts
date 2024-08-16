import { Role } from "../../utils/TypeUtils";
import z from "zod";
import { Entity } from "./Entity";

export const User = Entity("User", {
  username: z.string().openapi({ example: "john_doe" }),
  password: z.string().openapi({ example: "password" }),
  email: z.string().email().openapi({ example: "john.doe@mail.com" }),
  roles: z.array(Role).openapi({ example: [Role.enum.USER, Role.enum.ADMIN] }),
  refreshToken: z.array(z.string()),
});

export type User = Entity<typeof User>;
