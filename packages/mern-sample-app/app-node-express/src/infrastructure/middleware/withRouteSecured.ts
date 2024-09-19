import type { AuthorizationMiddleware } from "@org/app-node-express/infrastructure/middleware/withAuthorization";
import type { UserService } from "@org/app-node-express/infrastructure/service/UserService";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { Role } from "@org/lib-api-client";
import type { NextFunction, Request, RequestHandler, Response } from "express";

import { env } from "@org/app-node-express/env";
import { autowired, inject } from "@org/app-node-express/infrastructure/decorators";
import { IocRegistry } from "@org/app-node-express/lib/bottlejs";
import { RestError, getTypedError } from "@org/lib-api-client";
import jwt from "jsonwebtoken";

export interface RouteSecuredMiddleware {
  middleware(...roles: Role[]): RequestHandler[];
}

const IOC_KEY = "withRouteSecured";

@inject(IOC_KEY)
export class WithRouteSecured implements RouteSecuredMiddleware {
  @autowired("UserService") userService: UserService;
  @autowired("withAuthorization") authorization: AuthorizationMiddleware;

  middleware(...roles: Role[]): RequestHandler[] {
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

        const userResponse = await this.userService.findOneByUsername(tokenData.preferred_username);

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
        const handler = this.authorization.protect();
        handler(req, res, next);
      } catch (error: unknown) {
        // eslint-disable-next-line no-console
        console.log("Error in keycloak.protect()", error);
        next(getTypedError(error));
      }
    };

    return [protect, roleSecuredMiddleware];
  }
}

export function withRouteSecured(...roles: Role[]): RouteMiddlewareFactory {
  return () =>
    IocRegistry.getInstance()
      .inject<RouteSecuredMiddleware>(IOC_KEY)
      .middleware(...roles);
}
