import { type generateOpenApi } from "@ts-rest/open-api";

export type OperationMapper = NonNullable<Parameters<typeof generateOpenApi>[2]>["operationMapper"];

export const META_TAGS_KEY = "openApiTags";

export function buildPathFn(context: string) {
  return (path: string = "") => `/${context}${path}`;
}

export function buildRouteMetadata(tag: string) {
  return { [META_TAGS_KEY]: [tag] };
}

export function hasCustomTags(metadata: unknown): metadata is { [META_TAGS_KEY]: string[] } {
  return !!metadata && typeof metadata === "object" && META_TAGS_KEY in metadata;
}

export const operationMapper: OperationMapper = (operation, appRoute) => ({
  ...operation,
  ...(hasCustomTags(appRoute.metadata)
    ? {
        tags: appRoute.metadata.openApiTags,
      }
    : {}),
});
