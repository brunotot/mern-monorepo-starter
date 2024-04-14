import { RouteHandler } from "../meta/RoutesMetaService";
import { Route } from "./Route";

export function GetMapping<This, Fn extends RouteHandler>(path: string = "") {
  return Route<This, Fn>({
    method: "get",
    path,
  });
}
