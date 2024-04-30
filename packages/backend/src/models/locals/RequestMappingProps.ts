import { type RouteMethod } from "@models/locals/RouteMethod";
import { type RouteMiddleware } from "@models/locals/RouteMiddleware";

export type RequestMappingProps = {
  name: string;
  method: RouteMethod;
  path: string;
  middlewares: RouteMiddleware[];
};
