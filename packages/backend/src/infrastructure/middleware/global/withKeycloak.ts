/**
 * @packageDocumentation
 */

import { type RouteMiddlewareFactory } from "@org/backend/config/singletons/RouterCollection";
import { ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";
import { type IKeycloakAuth } from "@org/backend/infrastructure/security/interface/IKeycloakAuth";
import { KeycloakAuth } from "@org/backend/infrastructure/security/KeycloakAuth";

export const withKeycloak: RouteMiddlewareFactory = () => {
  return ServiceRegistry.getInstance().inject<IKeycloakAuth>(KeycloakAuth.name).middleware();
};
