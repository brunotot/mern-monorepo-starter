import { type OperationObject } from "@config";
import type { RouteHandler } from "@models";
import { Route } from "@decorators/route/@Route";

export function PostMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: OperationObject,
) {
  return Route<This, Fn>({
    method: "post",
    path,
    swagger,
  });
}
