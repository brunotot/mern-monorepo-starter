import type { AuthorizationMiddleware } from "@org/app-node-express/infrastructure/middleware/withAuthorization";
import type { UserService } from "@org/app-node-express/infrastructure/service/UserService";
import type { RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import type { Role } from "@org/lib-api-client";
import type { RequestHandler } from "express";

import { IocRegistry, autowired, inject } from "@org/app-node-express/ioc";
import { RestError, getTypedError } from "@org/lib-api-client";
import jwt from "jsonwebtoken";

export interface RouteSecuredMiddleware {
  middleware(...roles: Role[]): RequestHandler[];
}

export type TokenData = {
  email_verified: boolean;
  preferred_username: string;
  sub: string;
  scope: string;
};

const IOC_KEY = "withRouteSecured";

@inject(IOC_KEY)
export class WithRouteSecured implements RouteSecuredMiddleware {
  @autowired() private userService: UserService;
  @autowired() private authorizationMiddleware: AuthorizationMiddleware;

  public middleware(...roles: Role[]): RequestHandler[] {
    const protect: RequestHandler = async (req, res, next) => {
      try {
        const handler = this.authorizationMiddleware.protect();
        handler(req, res, next);
      } catch (error: unknown) {
        next(getTypedError(error));
      }
    };

    const roleSecuredMiddleware: RequestHandler = async (req, _res, next) => {
      if (roles.length === 0) return next();

      try {
        const token = this.getToken(req);

        const tokenData = this.decodeToken(token);

        const { roles: userRoles } = await this.userService.findOneByUsername(
          tokenData.preferred_username,
        );

        const hasAtLeastOneRole = userRoles.some(userRole => roles.includes(userRole as Role));

        if (!hasAtLeastOneRole) {
          throw new RestError(403, "User does not have the required role");
        }

        next();
      } catch (error: unknown) {
        next(getTypedError(error));
      }
    };

    return [protect, roleSecuredMiddleware];
  }

  private getToken(req: Parameters<RequestHandler>[0]): string {
    /**
     * The `authorization` header is guaranteed to exist at this point since the
     * preceding `protect` middleware validates the presence of a valid token.
     * Therefore, the `!` non-null assertion operator is safely used here to
     * access the `authorization` header without additional null or undefined checks.
     */
    const bearerToken = req.headers.authorization!;
    const token = bearerToken.split(" ")[1];
    return token;
  }

  private decodeToken(token: string): TokenData {
    const tokenData = jwt.decode(token) as TokenData;
    return tokenData;
  }
}

export function withRouteSecured(...roles: Role[]): RouteMiddlewareFactory {
  return () =>
    IocRegistry.getInstance()
      .inject<RouteSecuredMiddleware>(IOC_KEY)
      .middleware(...roles);
}
