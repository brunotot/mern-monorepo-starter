import { type ContractControllerFactory } from "./ContractControllerFactory";
import { type ContractData } from "./ContractData";
export type ContractNameFactory<C extends ContractData> = {
  [K in ContractControllerFactory<C>]: `${K}.${keyof C[K]}`;
}[ContractControllerFactory<C>];
//# sourceMappingURL=ContractNameFactory.d.ts.map
