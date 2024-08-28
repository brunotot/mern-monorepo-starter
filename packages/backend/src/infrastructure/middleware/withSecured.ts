import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorResponse } from "@org/shared";
import jwt from "jsonwebtoken";
import { iocRegistry } from "@org/backend/setup/registry.setup";
import { KeycloakRepository } from "../repository/impl/KeycloakRepository";
import { KeycloakAuthorization } from "@org/backend/infrastructure/security/KeycloakAuthorization";
import { getTypedError } from "@org/shared";
import { type Authorization } from "@org/backend/interface/Authorization";

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
    if (flattenedRoles.length === 0) {
      next();
      return;
    }

    try {
      const bearerToken = req.headers.authorization!;
      const token = bearerToken.split(" ")[1];
      const { sub: userId } = jwt.decode(token) as KeycloakTokenData;
      const roles = await iocRegistry
        .inject<KeycloakRepository>(KeycloakRepository.name)
        .findRolesByUserId(userId);
      const hasRole = flattenedRoles.some(role => roles.includes(role));

      if (!hasRole) {
        throw new ErrorResponse(403, "User does not have the required role");
      }

      next();
    } catch (error: unknown) {
      next(getTypedError(error));
    }
  };

  const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keycloakAuthorization = iocRegistry.inject<Authorization>(KeycloakAuthorization.name);
      const handler = keycloakAuthorization.protect();
      handler(req, res, next);
    } catch (error: unknown) {
      next(getTypedError(error));
    }
  };

  return [protect, roleSecuredMiddleware];
}
