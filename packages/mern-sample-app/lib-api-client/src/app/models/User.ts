import type { zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

import { KcUserRepresentation, KcUserRole } from "../../lib";

export const User = KcUserRepresentation.extend({
  realmRoles: z.array(KcUserRole),
}).openapi({
  title: "User",
  description: "User",
});

export type User = zod.infer<typeof User>;
