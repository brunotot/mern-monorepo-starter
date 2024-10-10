import type { zod } from "@org/lib-commons";

export * from "./User";

import { User } from "./User";
import { KcUserRole } from "../../lib";

export const Schemas = {
  User,
  KcUserRole,
} as const satisfies Record<string, zod.ZodTypeAny>;
