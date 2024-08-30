/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import { iocRegistry } from "@org/backend/setup/registry.setup";
import { type Authorization } from "@org/backend/interface/Authorization";

export const withKeycloak: RouteMiddlewareFactory = () => {
  return iocRegistry.inject<Authorization>("Authorization").middleware();
};
