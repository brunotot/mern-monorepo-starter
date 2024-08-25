import type { NextFunction, Request, RequestHandler, Response } from "express";
import { ErrorResponse } from "@org/shared";
import jwt from "jsonwebtoken";
import { ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";
import { KeycloakRepository } from "../repository/impl/KeycloakRepository";
import { type IKeycloakAuth } from "@org/backend/infrastructure/security/interface/IKeycloakAuth";
import { KeycloakAuth } from "@org/backend/infrastructure/security/KeycloakAuth";
import { getTypedError } from "@org/backend/config/utils/ErrorResponseUtils";

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
      const roles = await ServiceRegistry.getInstance()
        .inject<KeycloakRepository>(KeycloakRepository.name)
        .findRolesByUserId(userId);
      const hasRole = flattenedRoles.some(role => roles.includes(role));

      if (!hasRole) {
        throw new ErrorResponse(req.originalUrl, 403, "User does not have the required role");
      }

      next();
    } catch (error: unknown) {
      next(getTypedError(error));
    }
  };

  //const keycloakAuth = ServiceRegistry.getInstance().inject<IKeycloakAuth>(KeycloakAuth.name);

  const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const keycloakAuth = ServiceRegistry.getInstance().inject<IKeycloakAuth>(KeycloakAuth.name);
      const handler = keycloakAuth.protect();
      handler(req, res, next);
    } catch (error: unknown) {
      next(getTypedError(error));
    }
  };

  // TODO!
  // ovo se izvrsi prije nego se mockovi ucitaju i to je problem.
  // update: provjeriti jel ovo jos uvijek problem.
  return [protect, roleSecuredMiddleware];
}
