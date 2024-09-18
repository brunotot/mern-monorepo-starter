/**
 * @packageDocumentation
 */

import type { Authorization } from "@org/app-node-express/interface/Authorization";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import { IocRegistry } from "@org/app-node-express/lib/bottlejs";

export const withKeycloakDefaults: RouteMiddlewareFactory = () => {
  return IocRegistry.getInstance().inject<Authorization>("Authorization").middleware();
};
