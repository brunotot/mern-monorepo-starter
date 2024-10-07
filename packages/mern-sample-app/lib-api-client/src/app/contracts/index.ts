import type { AppRouter } from "../../lib/@ts-rest";

import { userContract } from "./User.contract";

export const contracts = {
  User: userContract,
} as const satisfies AppRouter;

export * from "./User.contract";
