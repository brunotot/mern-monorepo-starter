import { type AppRouter } from "@ts-rest/core";
import { type TODO } from "../../utils";

export type ContractData = Record<string, AppRouter>;

export type ContractControllerFactory<C extends ContractData> = keyof C;

export type ContractNameFactory<C extends ContractData> = {
  // @ts-expect-error - K and keyof C[K] are always strings
  [K in ContractControllerFactory<C>]: `${K}.${keyof C[K]}`;
}[ContractControllerFactory<C>];

export type ResolveContractFactory<
  Data extends ContractData,
  Name extends ContractNameFactory<Data>,
> = Traverse<Data, Split<Name>>;

/* Helpers */

type Split<T extends string, U extends string = "."> = T extends `${infer P}${U}${infer S}`
  ? [P, ...Split<S, U>]
  : [T];

type Traverse<T, P extends TODO[]> = P extends [infer F, ...infer R]
  ? F extends keyof T
    ? R extends []
      ? T[F]
      : R extends string[]
        ? Traverse<T[F], R>
        : never
    : never
  : never;
