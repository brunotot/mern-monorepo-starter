import type { TODO, zod } from "@org/lib-commons";

import { ContractNoBody } from "@ts-rest/core";

import { TS_REST_OPEN_API_SECURITY, TS_REST_OPEN_API_TAG } from "./TsRestOpenApi";

type OpenApiMetadata = Record<string, unknown>;

type OpenApiBody<TMethod extends "POST" | "PUT" | "DELETE" | "PATCH" | "GET"> =
  TMethod extends "DELETE" ? typeof ContractNoBody : undefined;

export function routeCommonProps<TGroupName extends string, TContextPath extends string>({
  groupName,
  contextPath,
}: {
  groupName: TGroupName;
  contextPath: TContextPath;
}) {
  return <
    TPath extends string,
    TMethod extends "POST" | "PUT" | "DELETE" | "PATCH" | "GET",
  >(props: {
    path: TPath;
    secured?: boolean;
    method: TMethod;
  }): {
    strictStatusCodes: true;
    path: `${TContextPath}${TPath}`;
    metadata: OpenApiMetadata;
    method: TMethod;
    body: OpenApiBody<TMethod>;
  } => {
    const metadata: OpenApiMetadata = {};
    metadata[TS_REST_OPEN_API_TAG] = [groupName];
    const { path, secured } = props;
    if (secured) {
      metadata[TS_REST_OPEN_API_SECURITY] = [
        {
          Keycloak: [],
        },
      ];
    }

    const body = (props.method === "DELETE" ? ContractNoBody : undefined) as OpenApiBody<TMethod>;

    return {
      strictStatusCodes: true,
      path: `${contextPath}${path}`,
      metadata: metadata,
      method: props.method,
      body,
    } as const;
  };
}

export function zodResponse<const T extends zod.ZodTypeAny>(
  zodSchema: T,
  customDescription: string = "",
): typeof zodSchema {
  if (!customDescription) return zodSchema;
  const metaOpenApi = (zodSchema as TODO).metaOpenApi ?? {};
  const title: string | undefined = metaOpenApi.title;
  const description: string | undefined = metaOpenApi.description;
  const model = zodSchema.describe(customDescription);
  if (title) return model.openapi({ ...metaOpenApi, title, description });
  return model.openapi({ ...metaOpenApi, description: "" });
}
