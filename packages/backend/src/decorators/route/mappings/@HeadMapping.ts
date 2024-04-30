import { type OperationObject } from "@config";
import type { RouteHandler } from "@models";
import { Route } from "@decorators/route/@Route";

export function HeadMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: OperationObject,
) {
  return Route<This, Fn>({
    method: "head",
    path,
    swagger,
  });
}
