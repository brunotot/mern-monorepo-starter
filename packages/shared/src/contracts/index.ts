// prettier-ignore
import type { ContractControllerFactory, ContractNameFactory, ResolveContractFactory } from "./@types";
import type { CONTRACTS } from "./schemas";

export type ContractController = ContractControllerFactory<typeof CONTRACTS>;
export type ContractName = ContractNameFactory<typeof CONTRACTS>;
// prettier-ignore
export type ResolveContract<Name extends ContractName> = ResolveContractFactory<typeof CONTRACTS, Name>;

export * from "./schemas";
