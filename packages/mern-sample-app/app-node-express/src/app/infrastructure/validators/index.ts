import type { Validators } from "@org/lib-api-client";

import { UserValidators } from "./UserValidator";

export const VALIDATORS = {
  User: UserValidators,
} as const satisfies Record<string, Validators>;
