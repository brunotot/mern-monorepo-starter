import type { RequestHandler } from "express";
import { ErrorResponse } from "@org/shared";
import jwt from "jsonwebtoken";
import { ServiceRegistry } from "@org/backend/config/singletons/ServiceRegistry";
import { KeycloakRepository } from "../repository/impl/KeycloakRepository";
import keycloak from "@org/backend/keycloak";

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
        .findRolesById(userId);
      const hasRole = flattenedRoles.some(role => roles.includes(role));

      if (!hasRole) {
        throw new ErrorResponse(req.originalUrl, 403, "User does not have the required role");
      }

      next();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error.content) {
        res.status(500).send({ error });
      }
      const typedError = error as ErrorResponse;
      const content = typedError.content;
      res.status(content.status).send(content);
    }
  };

  return [keycloak.protect(), roleSecuredMiddleware];
}
