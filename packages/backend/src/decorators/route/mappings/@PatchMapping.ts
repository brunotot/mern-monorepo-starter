import { SwaggerPath } from "../../../config";
import { RouteHandler } from "../../managers/RouteDecoratorManager";
import { Route } from "../@Route";

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
