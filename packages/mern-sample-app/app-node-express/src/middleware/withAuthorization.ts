/**
 * @packageDocumentation
 */

import type * as tsRest from "@org/app-node-express/lib/@ts-rest";
import * as bottlejs from "@org/app-node-express/lib/bottlejs";
import { type Authorization } from "@org/app-node-express/interface/Authorization";

export const withAuthorization: tsRest.RouteMiddlewareFactory = () => {
  return bottlejs.iocRegistry.inject<Authorization>("Authorization").middleware();
};
