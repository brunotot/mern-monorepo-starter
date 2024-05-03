import { type ContractData } from "./ContractData";

export type ContractControllerFactory<C extends ContractData> = keyof C;
