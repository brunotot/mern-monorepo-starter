import type { RouteHandler, SwaggerPath } from "@config";
import { Route } from "@decorators/route/@Route";

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
