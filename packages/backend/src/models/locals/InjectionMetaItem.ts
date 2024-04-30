import { type TODO } from "@org/shared";

export type InjectionMetaItem = {
  name: string;
  dependencies: string[];
  constructorParams: TODO[];
};
