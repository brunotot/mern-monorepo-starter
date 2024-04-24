import type { RouteHandler, SwaggerPath } from "@config";
import { Route } from "@decorators/route/@Route";

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
