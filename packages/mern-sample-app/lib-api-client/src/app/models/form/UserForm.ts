import type { zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

import { UserRepresentation } from "../../../lib/keycloak/api/UserRepresentation";
import { Role } from "../domain/Role";

export const UserForm = UserRepresentation.extend({
  roles: z.array(Role).min(1),
  password: z.string().min(4).optional(),
}).openapi({
  title: "User Form",
  description: "User Form",
});

export type UserForm = zod.infer<typeof UserForm>;
