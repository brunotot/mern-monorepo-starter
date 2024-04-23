import type { RouteHandler, SwaggerPath } from "@internal";

import { Route } from "@internal";

export function HeadMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "head",
    path,
    swagger,
  });
}
