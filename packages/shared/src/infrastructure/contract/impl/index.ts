import { UserContract } from "./User";
import type * as ContractUtils from "./../types";

export * from "./User";

export const CONTRACTS = {
  User: UserContract,
} as const satisfies ContractUtils.ContractData;
