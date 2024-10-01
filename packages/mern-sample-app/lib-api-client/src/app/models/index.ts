import type { zod } from "@org/lib-commons";

export * from "./User";
export * from "./Role";

import { Role } from "./Role";
import { User } from "./User";

export const Schemas = {
  User,
  Role,
} as const satisfies Record<string, zod.ZodTypeAny>;
