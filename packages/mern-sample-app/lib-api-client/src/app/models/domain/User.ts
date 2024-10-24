import type { zod } from "@org/lib-commons";

import { Keycloak } from "../../../lib/keycloak";

export const User = Keycloak.UserRepresentation.extend({}).openapi({
  title: "User",
  description: "User",
});

export type User = zod.infer<typeof User>;
