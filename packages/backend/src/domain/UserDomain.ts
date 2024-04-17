import { Role } from "@org/shared";
import z from "zod";
import { buildMongoEntity } from "./buildMongoEntity";

export const User = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  roles: z.array(Role),
  refreshToken: z.array(z.string()),
});

export type User = z.infer<typeof User>;

export default buildMongoEntity("User", User);
