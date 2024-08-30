/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/app-node-express/config/Route.config";
import { iocRegistry } from "@org/app-node-express/setup/registry.setup";
import { type Authorization } from "@org/app-node-express/interface/Authorization";

export const withKeycloak: RouteMiddlewareFactory = () => {
  return iocRegistry.inject<Authorization>("Authorization").middleware();
};
