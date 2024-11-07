import type { zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

//import { UserRepresentation } from "../../../lib/keycloak/api/UserRepresentation";
import { Role } from "../domain/Role";

export const UserForm = z
  .object({
    id: z.string().optional(),
    username: z.string().min(1),
    firstName: z.string().default(""),
    lastName: z.string().default(""),
    enabled: z.boolean().default(true),
    roles: z.array(Role).min(1),
    password: z.string().min(4).optional(),
    email: z
      .string()
      .default("")
      .refine(value => value === "" || /\S+@\S+\.\S+/.test(value), "Invalid email"),
  })
  .openapi({
    title: "User Form",
    description: "User Form",
  });

/*UserForm.merge({
  username: UserForm.shape.username
})*/

export type UserForm = zod.infer<typeof UserForm>;
