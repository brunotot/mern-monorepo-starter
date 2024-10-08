import { z, type zod } from "@org/lib-commons";

export const KcRole = z.enum(["admin", "user"]);

export type KcRole = zod.infer<typeof KcRole>;

export const KcUserRepresentation = z.object({
  id: z.string().optional(),
  username: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().optional(),
  realmRoles: z.array(KcRole).default([]),
});

export type KcUserRepresentation = zod.infer<typeof KcUserRepresentation>;
