import { type RequestHandler } from "express";
import { type IKeycloakAuth } from "../../dist/infrastructure/security/interface/IKeycloakAuth";

export class KeycloakAuthMock implements IKeycloakAuth {
  middleware(): RequestHandler[] {
    const mockMiddleware: RequestHandler = (req, res, next) => {
      next();
    };

    return [mockMiddleware];
  }
  protect(): RequestHandler {
    return (req, res, next) => {
      next();
    };
  }
}
