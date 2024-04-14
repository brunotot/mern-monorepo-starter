import { RouteHandler } from "../meta/RoutesMetaService";
import { Route } from "./Route";

export function PostMapping<This, Fn extends RouteHandler>(path: string = "") {
  return Route<This, Fn>({
    method: "post",
    path,
  });
}
