import { type TsRestContracts } from "./../../lib/@ts-rest";
import { userContract } from "./User.contract";

export const contracts = {
  User: userContract,
} as const satisfies TsRestContracts;

export * from "./User.contract";
