import type { ContractName, ContractResolver } from "@org/shared";
import type { ServerInferResponses } from "@ts-rest/core";

export type RouteOutput<Name extends ContractName> = Promise<
  ServerInferResponses<ContractResolver<Name>>
>;
