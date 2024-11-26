import type { zod } from "@org/lib-commons";

export * from "./error";
export * from "./domain";
export * from "./dto";
export * from "./form";

import { User, Role } from "./domain";

export const Schemas = {
  User,
  Role,
} as const satisfies Record<string, zod.ZodTypeAny>;
