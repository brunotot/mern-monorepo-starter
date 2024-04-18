import { SwaggerPath } from "../../../config";
import { RouteHandler } from "../../../meta/RoutesMetaService";
import { Route } from "../@Route";

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
