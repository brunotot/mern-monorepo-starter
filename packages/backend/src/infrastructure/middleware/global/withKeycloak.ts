/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/Route.config";
import { iocRegistry } from "@org/backend/setup/registry.setup";
import { KeycloakAuthorization } from "@org/backend/infrastructure/security/KeycloakAuthorization";
import { type Authorization } from "@org/backend/interface/Authorization";

export const withKeycloak: RouteMiddlewareFactory = () => {
  return iocRegistry.inject<Authorization>(KeycloakAuthorization.name).middleware();
};
