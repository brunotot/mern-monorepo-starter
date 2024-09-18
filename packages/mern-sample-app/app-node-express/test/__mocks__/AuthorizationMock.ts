import { type RequestHandler } from "express";

import { type Authorization } from "../../dist/interface/Authorization";

function empty(): RequestHandler {
  return (_req, _res, next) => {
    next();
  };
}

export class AuthorizationMock implements Authorization {
  middleware(): RequestHandler[] {
    return [empty()];
  }

  protect(): RequestHandler {
    return empty();
  }
}
