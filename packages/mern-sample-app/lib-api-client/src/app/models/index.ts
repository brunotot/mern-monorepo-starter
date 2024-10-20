import type { zod } from "@org/lib-commons";

export * from "./Role";
export * from "./User";

import { Role } from "./Role";
import { User } from "./User";

export const Schemas = {
  Role,
  User,
} as const satisfies Record<string, zod.ZodTypeAny>;
