import type { ContractName, ContractResolver } from "@org/shared";
import type { AppRouteImplementation } from "@ts-rest/express";

export type RouteInput<Name extends ContractName> = Parameters<
  AppRouteImplementation<ContractResolver<Name>>
>[0];
