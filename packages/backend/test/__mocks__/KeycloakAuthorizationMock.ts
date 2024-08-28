import { type RequestHandler } from "express";
import { type Authorization } from "../../dist/interface/Authorization";

export class KeycloakAuthorizationMock implements Authorization {
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
