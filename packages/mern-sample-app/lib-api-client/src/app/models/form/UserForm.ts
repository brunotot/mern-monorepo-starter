import type { zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

import { UserRepresentation } from "../../../lib";
import { Role } from "../domain/Role";

export const UserForm = UserRepresentation.extend({
  roles: z.array(Role),
  hasCredentials: z.boolean(),
  password: z.string().optional(),
})
  .refine(data => (data.hasCredentials ? (data.password?.length ?? 0) > 0 : true), {
    message: "Password is required when hasCredentials is true",
    path: ["password"],
  })
  .openapi({
    title: "User Form",
    description: "User Form",
  });

export type UserForm = zod.infer<typeof UserForm>;
