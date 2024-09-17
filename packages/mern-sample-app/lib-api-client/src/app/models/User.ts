import { z, type zod } from "@org/lib-commons";

export const User = z.object({
  _id: z.string().optional(),
  username: z.string(),
  roles: z.array(z.string()),
});

export type User = zod.infer<typeof User>;
