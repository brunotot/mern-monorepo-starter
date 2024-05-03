import { ObjectId, Role } from "../../utils/TypeUtils";
import z from "zod";

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

export type User = z.infer<typeof User>;
