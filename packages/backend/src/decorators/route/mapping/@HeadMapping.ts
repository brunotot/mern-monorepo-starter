import { SwaggerPath } from "../../../config";
import { RouteHandler } from "../../../meta/RoutesMetaService";
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
