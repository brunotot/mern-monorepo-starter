import { type ContractControllerFactory } from "./ContractControllerFactory";
import { type ContractData } from "./ContractData";

export type ContractNameFactory<C extends ContractData> = {
  // @ts-expect-error - K and keyof C[K] are always strings
  [K in ContractControllerFactory<C>]: `${K}.${keyof C[K]}`;
}[ContractControllerFactory<C>];
