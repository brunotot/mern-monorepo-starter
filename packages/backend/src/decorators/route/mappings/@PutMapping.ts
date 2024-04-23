import type { RouteHandler, SwaggerPath } from "@internal";

import { Route } from "@internal";

export function PutMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "put",
    path,
    swagger,
  });
}
