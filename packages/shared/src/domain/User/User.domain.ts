import { Role, Entity } from "../../config";
import { z } from "../../config/Zod.config";

/** @hidden */
export const User = Entity("User", {
  username: z.string().openapi({ example: "john_doe" }),
  password: z.string().openapi({ example: "password" }),
  email: z.string().email().openapi({ example: "john.doe@mail.com" }),
  roles: z.array(Role).openapi({ example: [Role.enum.USER, Role.enum.ADMIN] }),
  refreshToken: z.array(z.string()),
});

export type User = Entity<typeof User>;
