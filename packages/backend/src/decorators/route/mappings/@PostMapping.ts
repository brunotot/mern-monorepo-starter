import type { RouteHandler, SwaggerPath } from "@internal";

import { Route } from "@internal";

export function PostMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "post",
    path,
    swagger,
  });
}
