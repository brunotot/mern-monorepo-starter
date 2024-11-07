import type { AppRouter } from "../../lib/@ts-rest";

import { constraintViolationContract } from "./ConstraintViolation.contract";
import { userContract } from "./User.contract";

export const contracts = {
  User: userContract,
  ConstraintViolation: constraintViolationContract,
} as const satisfies AppRouter;

export * from "./User.contract";
