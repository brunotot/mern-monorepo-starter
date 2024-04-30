import { type RequestMappingProps } from "@models/locals/RequestMappingProps";
import { type RouteHandler } from "@models/locals/RouteHandler";
import { type OperationObject } from "@config";

export type RequestRoute = RequestMappingProps & {
  handler: RouteHandler;
  swagger?: OperationObject;
};
