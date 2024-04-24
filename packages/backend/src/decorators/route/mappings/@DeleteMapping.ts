import type { RouteHandler, SwaggerPath } from "@config";
import { Route } from "@decorators/route/@Route";

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
