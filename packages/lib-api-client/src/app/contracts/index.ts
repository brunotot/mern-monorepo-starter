import type { AppRouter } from "@/lib/@ts-rest/TsRestTypes";

import { constraintViolationContract } from "@/app/contracts/ConstraintViolation.contract";
import { userContract } from "@/app/contracts/User.contract";

export const contracts = {
  User: userContract,
  ConstraintViolation: constraintViolationContract,
} as const satisfies AppRouter;

export * from "./User.contract";
