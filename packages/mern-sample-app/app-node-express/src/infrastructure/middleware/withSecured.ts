import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

import { env } from "@org/app-node-express/env";
import { type Authorization } from "@org/app-node-express/interface/Authorization";
import { type AuthorizationRepository } from "@org/app-node-express/interface/AuthorizationRepository";

import * as utils from "@org/lib-commons";
import * as bottlejs from "@org/app-node-express/lib/bottlejs";
import type * as KC from "@org/app-node-express/lib/keycloak-connect";

export function withSecured(...roles: KC.KeycloakRole[]): RequestHandler[] {
  const flattenedRoles = roles.flat();

  const roleSecuredMiddleware: RequestHandler = async (req, res, next) => {
    if (flattenedRoles.length === 0 || env.NODE_ENV === "test") {
      next();
      return;
    }

    try {
      const bearerToken = req.headers.authorization!;
      const token = bearerToken.split(" ")[1];
      const { sub: userId } = jwt.decode(token) as KC.KeycloakTokenData;
      const roles = await bottlejs.iocRegistry
        .inject<AuthorizationRepository>("AuthorizationRepository")
        .findRolesByUserId(userId);
      const hasRole = flattenedRoles.some(role => roles.includes(role));

      if (!hasRole) {
        throw new utils.ErrorResponse(403, "User does not have the required role");
      }

      next();
    } catch (error: unknown) {
      console.log("error in withSecured", error);
      next(utils.getTypedError(error));
    }
  };

  const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keycloakAuthorization = bottlejs.iocRegistry.inject<Authorization>("Authorization");
      const handler = keycloakAuthorization.protect();
      handler(req, res, next);
    } catch (error: unknown) {
      console.log("Error in keycloak.protect()", error);
      next(utils.getTypedError(error));
    }
  };

  return [protect, roleSecuredMiddleware];
}
