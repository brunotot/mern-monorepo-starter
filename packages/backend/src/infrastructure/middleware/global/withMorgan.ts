/**
 * @packageDocumentation HTTP request logger middleware for NodeJS.
 * @see {@link https://www.npmjs.com/package/morgan|npm specifics}
 */

import morgan from "morgan";
import { env } from "@org/backend/config/singletons/Environment";
import type { RouteMiddlewareFactory } from "@org/backend/config/singletons/RouterCollection";
import { stream } from "@org/backend/config/singletons/Logger";

export const withMorgan: RouteMiddlewareFactory = () => {
  if (env.NODE_ENV === "test") {
    return (req, res, next) => next();
  }

  return morgan("dev", { stream });
};
