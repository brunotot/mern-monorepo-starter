import type { RouteHandler, SwaggerPath } from "@config";
import { Route } from "@decorators/route/@Route";

export function OptionsMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "options",
    path,
    swagger,
  });
}
