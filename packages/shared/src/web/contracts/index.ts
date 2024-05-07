import { UserContract as User } from "./UserContract";
import { AuthContract as Auth } from "./AuthContract";
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
  Auth,
  User,
} as const satisfies ContractData;

export * from "./AuthContract";
export * from "./UserContract";
export type { ContractController, ContractName, ContractResolver };
export { CONTRACTS };
