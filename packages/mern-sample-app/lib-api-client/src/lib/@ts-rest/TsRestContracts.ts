import type { TODO, zod } from "@org/lib-commons";

import { TS_REST_OPEN_API_SECURITY, TS_REST_OPEN_API_TAG } from "./TsRestOpenApi";

export function routeCommonProps<TGroupName extends string, TContextPath extends string>({
  groupName,
  contextPath,
}: {
  groupName: TGroupName;
  contextPath: TContextPath;
}) {
  return <TPath extends string>(props: { path: TPath; secured?: boolean }) => {
    const metadata: Record<string, unknown> = {};
    metadata[TS_REST_OPEN_API_TAG] = [groupName];
    const { path, secured } = props;
    if (secured) {
      metadata[TS_REST_OPEN_API_SECURITY] = [
        {
          Keycloak: [],
        },
      ];
    }
    return {
      strictStatusCodes: true,
      path: `${contextPath}${path}`,
      metadata: metadata,
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
