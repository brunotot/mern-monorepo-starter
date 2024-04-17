import { SwaggerPath } from "../config";
import { RouteHandler } from "../meta/RoutesMetaService";
import { Route } from "./Route";

export function GetMapping<This, Fn extends RouteHandler>(
  path: string = "",
  swagger?: SwaggerPath
) {
  return Route<This, Fn>({
    method: "get",
    path,
    swagger,
  });
}
