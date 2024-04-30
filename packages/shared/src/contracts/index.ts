import { type AppRouter } from "@ts-rest/core";
import { AuthContract as Auth } from "./AuthContract";
import { UserContract as User } from "./UserContract";

export const Contracts = {
  Auth,
  User,
} as const satisfies Record<string, AppRouter>;

export type ContractController = keyof typeof Contracts;

export type ContractName = {
  // @ts-ignore
  [K in ContractController]: `${K}.${keyof (typeof Contracts)[K]}`;
}[ContractController];

type Split<T extends string, U extends string = "."> = T extends `${infer P}${U}${infer S}`
  ? [P, ...Split<S, U>]
  : [T];

type Traverse<T, P extends any[]> = P extends [infer F, ...infer R]
  ? F extends keyof T
    ? R extends []
      ? T[F]
      : R extends string[]
        ? Traverse<T[F], R>
        : never
    : never
  : never;

export type ResolveContract<T extends ContractName> = Traverse<typeof Contracts, Split<T>>;

export * from "./AuthContract";
export * from "./UserContract";
