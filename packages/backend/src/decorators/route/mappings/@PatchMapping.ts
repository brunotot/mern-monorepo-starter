import type { RouteHandler, SwaggerPath } from "@internal";

import { Route } from "@internal";

export function PatchMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "patch",
    path,
    swagger,
  });
}
