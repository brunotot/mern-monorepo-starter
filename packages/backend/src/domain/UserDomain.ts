import { AbstractDomain, makeDomain } from "@internal";
import { Role } from "@org/shared";
import mongoose from "mongoose";
import z from "zod";

export const userDomain = makeDomain(
  class extends AbstractDomain {
    zod = z
      .object({
        username: z.string().openapi({ example: "john_doe" }),
        password: z.string().openapi({ example: "password" }),
        email: z.string().email().openapi({ example: "john.doe@mail.com" }),
        roles: z.array(Role).openapi({ example: [Role.enum.USER, Role.enum.ADMIN] }),
        refreshToken: z.array(z.string()),
      })
      .describe("User");

    schema = new mongoose.Schema<z.infer<typeof this.zod>>({
      username: { type: String, required: true },
      password: { type: String, required: true },
      email: { type: String, required: true },
      roles: { type: [String], required: true },
      refreshToken: { type: [String] },
    });
  },
);

export type User = z.infer<(typeof userDomain)["zod"]>;
