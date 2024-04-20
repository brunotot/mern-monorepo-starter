import { SwaggerPath } from "../../../config";
import { RouteHandler } from "../../managers/RouteDecoratorManager";
import { Route } from "../@Route";

export function HeadMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath,
) {
  return Route<This, Fn>({
    method: "head",
    path,
    swagger,
  });
}
