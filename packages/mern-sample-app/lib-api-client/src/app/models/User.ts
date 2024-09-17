import { z, type zod } from "@org/lib-commons";
import { Entity } from "./utils";

export const User = Entity("User", {
  username: z.string(),
  roles: z.array(z.string()),
});

export type User = zod.infer<typeof User>;
