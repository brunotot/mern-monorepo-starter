import { type TODO } from "../../utils";
import { type ContractData } from "./ContractData";
import { type ContractNameFactory } from "./ContractNameFactory";

export type ContractResolverFactory<
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
