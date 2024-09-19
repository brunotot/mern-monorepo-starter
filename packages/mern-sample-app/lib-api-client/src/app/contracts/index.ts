import type { AppRouter } from "@ts-rest/core";

import { userContract } from "./User.contract";

export const contracts = {
  User: userContract,
} as const satisfies AppRouter;

export * from "./User.contract";
