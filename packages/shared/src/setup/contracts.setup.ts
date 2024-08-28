import { type ContractData } from "../config/Contract.config";
import { userContract } from "../domain";

export const contracts = {
  User: userContract,
} as const satisfies ContractData;
