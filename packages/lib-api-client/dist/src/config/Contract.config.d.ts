import { type AppRouter } from "@ts-rest/core";
import { type generateOpenApi } from "@ts-rest/open-api";
import { type TODO, z } from "@org/lib-commons";
export type OperationMapper = NonNullable<Parameters<typeof generateOpenApi>[2]>["operationMapper"];
export type ContractData = Record<string, AppRouter>;
export type ContractControllerFactory<C extends ContractData> = keyof C;
export type ContractNameFactory<C extends ContractData> = {
  [K in ContractControllerFactory<C>]: `${K}.${keyof C[K]}`;
}[ContractControllerFactory<C>];
export type ContractResolverFactory<
  Data extends ContractData,
  Name extends ContractNameFactory<Data>,
> = Traverse<Data, Split<Name>>;
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
export declare function routeCommonConfigFactory<
  TGroupName extends string,
  TContextPath extends string,
>({
  groupName,
  contextPath,
}: {
  groupName: TGroupName;
  contextPath: TContextPath;
}): <TPath extends string>(
  path: TPath,
) => {
  readonly strictStatusCodes: true;
  readonly metadata: {
    readonly openApiTags: readonly [TGroupName];
  };
  readonly path: `${TContextPath}${TPath}`;
};
export declare const operationMapper: OperationMapper;
export declare const ZOD_ERROR_500: z.ZodObject<
  {
    details: z.ZodString;
    status: z.ZodNumber;
    message: z.ZodString;
    path: z.ZodString;
    timestamp: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
  },
  "strip",
  z.ZodTypeAny,
  {
    details: string;
    status: number;
    message: string;
    path: string;
    timestamp: string;
    metadata: Record<string, any>;
  },
  {
    details: string;
    status: number;
    message: string;
    path: string;
    timestamp: string;
    metadata: Record<string, any>;
  }
>;
export declare const ZOD_ERROR_ANY: z.ZodObject<
  z.objectUtil.extendShape<
    {
      details: z.ZodString;
      status: z.ZodNumber;
      message: z.ZodString;
      path: z.ZodString;
      timestamp: z.ZodString;
      metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
    },
    {}
  >,
  "strip",
  z.ZodTypeAny,
  {
    details: string;
    status: number;
    message: string;
    path: string;
    timestamp: string;
    metadata: Record<string, any>;
  },
  {
    details: string;
    status: number;
    message: string;
    path: string;
    timestamp: string;
    metadata: Record<string, any>;
  }
>;
export {};
//# sourceMappingURL=Contract.config.d.ts.map
