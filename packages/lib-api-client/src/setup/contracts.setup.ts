import { type ContractData } from "../config/Contract.config";
import { userContract } from "../contracts";

export const contracts = {
  User: userContract,
} as const satisfies ContractData;
