import type { RouteHandler, SwaggerPath } from "@config";
import { Route } from "@decorators";

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
