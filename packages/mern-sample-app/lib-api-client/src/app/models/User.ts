import type { zod } from "@org/lib-commons";

import { z } from "@org/lib-commons";

import { UserRepresentation } from "../../lib";
import { Role } from "../models";

export const User = UserRepresentation.extend({
  roles: z.array(Role),
}).openapi({
  title: "User",
  description: "User",
});

export type User = zod.infer<typeof User>;
