import { SERVICE_SCHEMA } from "../config";

export type DependencySchema = OmitNever<{
  [K in keyof typeof SERVICE_SCHEMA]: ClassDependencyList<
    (typeof SERVICE_SCHEMA)[K]
  >;
}>;

export type Class<T = unknown> = new (...args: any[]) => T;

export type ServiceName = Uncapitalize<keyof typeof SERVICE_SCHEMA>;

type FilterNeverFromArray<T> = T extends [infer First, ...infer Rest]
  ? First extends never
    ? FilterNeverFromArray<Rest>
    : [First, ...FilterNeverFromArray<Rest>]
  : [];

type ExcludeServices<Model extends Class> = OmitNever<{
  [K in keyof InstanceType<Model>]: K extends ServiceName ? K : never;
}>;

type ServiceNameUnion<Model extends Class> = keyof ExcludeServices<Model>;

type GetServiceNameTupleArray<Model extends Class> = ToTuple<
  ServiceNameUnion<Model> & string
>;

type ClassDependencyList<Model extends Class> = FilterNeverFromArray<
  GetServiceNameTupleArray<Model>
>;

type OmitNever<T> = {
  [P in keyof T as T[P] extends never ? never : P]: T[P];
};

type UnionToParm<U> = U extends any ? (k: U) => void : never;
type UnionToSect<U> = UnionToParm<U> extends (k: infer I) => void ? I : never;
type ExtractParm<F> = F extends { (a: infer A): void } ? A : never;
type SpliceOne<Union> = Exclude<Union, ExtractOne<Union>>;
type ExtractOne<Union> = ExtractParm<UnionToSect<UnionToParm<Union>>>;
type ToTuple<Union> = ToTupleRec<Union, []>;
type ToTupleRec<Union, Rslt extends any[]> = SpliceOne<Union> extends never
  ? [ExtractOne<Union>, ...Rslt]
  : ToTupleRec<SpliceOne<Union>, [ExtractOne<Union>, ...Rslt]>;

export type ServiceData = [ServiceName, Class, ...ServiceName[]];
