import { z, type zod } from "@org/lib-commons";

import { Role } from "./Role";

export const User = z.object({
  _id: z.string().optional(),
  username: z.string(),
  roles: z.array(Role),
});

export type User = zod.infer<typeof User>;
