import type { RouteHandler, SwaggerPath } from "@internal";

import { Route } from "@internal";

export function GetMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "get",
    path,
    swagger,
  });
}
