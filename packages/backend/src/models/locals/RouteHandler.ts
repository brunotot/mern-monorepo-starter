import { type AppRouteImplementation } from "@ts-rest/express";
import { type ServerInferResponses } from "@ts-rest/core";
import { type ContractName, type ResolveContract } from "@org/shared";

export type Input<Name extends ContractName> = Parameters<
  AppRouteImplementation<ResolveContract<Name>>
>[0];
export type Output<Name extends ContractName> = Promise<
  ServerInferResponses<ResolveContract<Name>>
>;
export type RouteHandler<Name extends ContractName> = (data: Input<Name>) => Output<Name>;
