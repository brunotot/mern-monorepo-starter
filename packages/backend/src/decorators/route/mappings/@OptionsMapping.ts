import { type OperationObject } from "@config";
import type { RouteHandler } from "@models";
import { Route } from "@decorators/route/@Route";

export function OptionsMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: OperationObject,
) {
  return Route<This, Fn>({
    method: "options",
    path,
    swagger,
  });
}
