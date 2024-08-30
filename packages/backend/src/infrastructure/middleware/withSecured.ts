import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorResponse } from "@org/shared";
import jwt from "jsonwebtoken";
import { iocRegistry } from "@org/backend/setup/registry.setup";
import { getTypedError } from "@org/shared";
import { type Authorization } from "@org/backend/interface/Authorization";
import { type AuthorizationRepository } from "@org/backend/interface/AuthorizationRepository";
import { env } from "@org/backend/setup/env.setup";

export type KeycloakRole = "admin" | "user";

export type KeycloakTokenData = {
  email_verified: boolean;
  preferred_username: string;
  sub: string;
  scope: string;
};

export function withSecured(...roles: KeycloakRole[]): RequestHandler[] {
  const flattenedRoles = roles.flat();

  const roleSecuredMiddleware: RequestHandler = async (req, res, next) => {
    if (flattenedRoles.length === 0 || env.NODE_ENV === "test") {
      next();
      return;
    }

    try {
      const bearerToken = req.headers.authorization!;
      const token = bearerToken.split(" ")[1];
      const { sub: userId } = jwt.decode(token) as KeycloakTokenData;
      const roles = await iocRegistry
        .inject<AuthorizationRepository>("AuthorizationRepository")
        .findRolesByUserId(userId);
      const hasRole = flattenedRoles.some(role => roles.includes(role));

      if (!hasRole) {
        throw new ErrorResponse(403, "User does not have the required role");
      }

      next();
    } catch (error: unknown) {
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
      console.log("Error in keycloak.protect()", error);
      next(getTypedError(error));
    }
  };

  return [protect, roleSecuredMiddleware];
}
