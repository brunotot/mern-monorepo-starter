import { UserContract as User } from "./UserContract";
import type {
  ContractData,
  ContractControllerFactory,
  ContractNameFactory,
  ContractResolverFactory,
} from "./../../types";

type ContractController = ContractControllerFactory<typeof CONTRACTS>;

type ContractName = ContractNameFactory<typeof CONTRACTS>;

type ContractResolver<Name extends ContractName> = ContractResolverFactory<typeof CONTRACTS, Name>;

const CONTRACTS = {
  User,
} as const satisfies ContractData;

export * from "./UserContract";
export type { ContractController, ContractName, ContractResolver };
export { CONTRACTS };
