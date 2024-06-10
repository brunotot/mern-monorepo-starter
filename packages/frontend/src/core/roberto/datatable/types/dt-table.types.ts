import { TODO } from "@org/shared";

export type RowType = Record<string, TODO>;

type ExtractReactKeys<T> = {
  [K in keyof T]: T[K] extends string | number ? K : never;
}[keyof T];
export type DtIdentifier<T> = ExtractReactKeys<T>;
export type DtDataFilter<T> = (item: T) => boolean;
export type DtSearchFilter<T> = (item: T, search: string) => boolean;
