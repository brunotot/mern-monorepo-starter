/**
 * @packageDocumentation Middleware to protect against HTTP Parameter Pollution attacks.
 * @see {@link https://www.npmjs.com/package/hpp|npm specifics}
 * @see {@link https://en.wikipedia.org/wiki/HTTP_parameter_pollution|http parameter pollution wiki}
 */

import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import hpp from "hpp";

export const withHpp: RouteMiddlewareFactory = () => {
  return hpp();
};
