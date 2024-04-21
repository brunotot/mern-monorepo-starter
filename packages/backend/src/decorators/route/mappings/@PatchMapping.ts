import type { RouteHandler } from "@internal";
import { Route } from "@internal";
import type { SwaggerPath } from "@types";

export function PatchMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "patch",
    path,
    swagger,
  });
}
