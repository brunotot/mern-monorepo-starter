import type { RouteHandler } from "@internal";
import { Route } from "@internal";
import type { SwaggerPath } from "@internal";

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
