import type { RouteHandler, SwaggerPath } from "@internal";

import { Route } from "@internal";

export function DeleteMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "delete",
    path,
    swagger,
  });
}
