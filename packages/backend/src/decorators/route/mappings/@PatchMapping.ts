import { type OperationObject } from "openapi3-ts/oas31";
import type { RouteHandler } from "@config";
import { Route } from "@decorators/route/@Route";

export function PatchMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: OperationObject,
) {
  return Route<This, Fn>({
    method: "patch",
    path,
    swagger,
  });
}
