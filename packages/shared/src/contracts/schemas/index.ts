import type { ContractData } from "../@types";
import { UserContract as User } from "./UserContract";
import { AuthContract as Auth } from "./AuthContract";

export * from "./AuthContract";
export * from "./UserContract";

export const CONTRACTS = {
  Auth,
  User,
} as const satisfies ContractData;
