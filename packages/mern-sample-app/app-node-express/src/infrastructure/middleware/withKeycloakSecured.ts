import type { Authorization } from "@org/app-node-express/interface/Authorization";
import type { Role } from "@org/lib-api-client";
import type { NextFunction, Request, RequestHandler, Response } from "express";

import { env } from "@org/app-node-express/env";
import { type UserService } from "@org/app-node-express/infrastructure/service/UserService";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { RestError, getTypedError } from "@org/lib-api-client";
import jwt from "jsonwebtoken";

export function withKeycloakSecured(...roles: Role[]): RequestHandler[] {
  const flattenedRoles = roles.flat();

  const roleSecuredMiddleware: RequestHandler = async (req, res, next) => {
    if (flattenedRoles.length === 0 || env.SERVER_ENV === "test") {
      next();
      return;
    }

    try {
      const bearerToken = req.headers.authorization!;
      const token = bearerToken.split(" ")[1];

      const tokenData = jwt.decode(token) as {
        email_verified: boolean;
        preferred_username: string;
        sub: string;
        scope: string;
      };

      const userResponse = await IocRegistry.getInstance()
        .inject<UserService>("UserService")
        .findOneByUsername(tokenData.preferred_username);

      const roles = userResponse.roles;

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
      const authorization = IocRegistry.getInstance().inject<Authorization>("Authorization");
      const handler = authorization.protect();
      handler(req, res, next);
    } catch (error: unknown) {
      // eslint-disable-next-line no-console
      console.log("Error in keycloak.protect()", error);
      next(getTypedError(error));
    }
  };

  return [protect, roleSecuredMiddleware];
}
