import { type AppRouter } from "@ts-rest/core";
import { type generateOpenApi } from "@ts-rest/open-api";
import { type TODO } from "@org/lib-commons";

export type OperationMapper = NonNullable<Parameters<typeof generateOpenApi>[2]>["operationMapper"];

export type ContractData = Record<string, AppRouter>;

export type ContractControllerFactory<C extends ContractData> = keyof C;

export type ContractNameFactory<C extends ContractData> = {
  // @ts-expect-error - K and keyof C[K] are always strings
  [K in ContractControllerFactory<C>]: `${K}.${keyof C[K]}`;
}[ContractControllerFactory<C>];

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

/** @hidden */
export function routeCommonConfigFactory<TGroupName extends string, TContextPath extends string>({
  groupName,
  contextPath,
}: {
  groupName: TGroupName;
  contextPath: TContextPath;
}) {
  return <TPath extends string>(path: TPath) => {
    return {
      strictStatusCodes: true,
      metadata: {
        [META_TAGS_KEY]: [groupName],
      },
      path: `${contextPath}${path}`,
    } as const;
  };
}

export const operationMapper: OperationMapper = (operation, appRoute) => ({
  ...operation,
  ...(hasCustomTags(appRoute.metadata)
    ? {
        tags: appRoute.metadata.openApiTags,
      }
    : {}),
});

/* Internals below */

const META_TAGS_KEY = "openApiTags";

function hasCustomTags(metadata: unknown): metadata is { [META_TAGS_KEY]: string[] } {
  return !!metadata && typeof metadata === "object" && META_TAGS_KEY in metadata;
}
