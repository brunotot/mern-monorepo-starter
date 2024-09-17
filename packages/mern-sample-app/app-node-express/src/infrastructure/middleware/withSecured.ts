import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "@org/app-node-express/env";
import { type Authorization } from "@org/app-node-express/interface/Authorization";
import { type AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";
import { RestError, type Role, getTypedError } from "@org/lib-api-client";
import { iocRegistry } from "@org/app-node-express/lib/bottlejs";

export function withSecured(...roles: Role[]): RequestHandler[] {
  const flattenedRoles = roles.flat();

  const roleSecuredMiddleware: RequestHandler = async (req, res, next) => {
    if (flattenedRoles.length === 0 || env.SERVER_ENV === "test") {
      next();
      return;
    }

    try {
      const bearerToken = req.headers.authorization!;
      const token = bearerToken.split(" ")[1];

      const { sub: userId } = jwt.decode(token) as {
        email_verified: boolean;
        preferred_username: string;
        sub: string;
        scope: string;
      };

      const roles = await iocRegistry
        .inject<AuthorizationRepository>("AuthorizationRepository")
        .findRolesByUserId(userId);
      const hasRole = flattenedRoles.some(role => roles.includes(role));

      if (!hasRole) {
        throw new RestError(403, "User does not have the required role");
      }

      next();
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log("error in withSecured", error);
      next(getTypedError(error));
    }
  };

  const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keycloakAuthorization = iocRegistry.inject<Authorization>("Authorization");
      const handler = keycloakAuthorization.protect();
      handler(req, res, next);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log("Error in keycloak.protect()", error);
      next(getTypedError(error));
    }
  };

  return [protect, roleSecuredMiddleware];
}
