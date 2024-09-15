import { type AppRouter } from "@ts-rest/core";
import { TS_REST_OPEN_API_TAG } from "./TsRestOpenApi";

export type TsRestContracts = Record<string, AppRouter>;

export function routeCommonProps<TGroupName extends string, TContextPath extends string>({
  groupName,
  contextPath,
}: {
  groupName: TGroupName;
  contextPath: TContextPath;
}) {
  return <TPath extends string>(path: TPath) => {
    return {
      strictStatusCodes: true,
      path: `${contextPath}${path}`,
      metadata: {
        [TS_REST_OPEN_API_TAG]: [groupName],
      },
    } as const;
  };
}
