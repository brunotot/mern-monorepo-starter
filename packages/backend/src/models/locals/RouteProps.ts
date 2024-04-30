import { type RequestMappingProps } from "@models/locals/RequestMappingProps";
import { type OperationObject } from "@config";

export type RouteProps = Omit<RequestMappingProps, "name" | "middlewares"> & {
  swagger?: OperationObject;
};
