import type { NextFunction, Request, Response } from "express";
import { $BackendAppConfig, AllowedOrigin } from "../config";

export function credentials() {
  return function (req: Request, res: Response, next: NextFunction) {
    const origin = req.headers.origin;
    if (
      origin &&
      $BackendAppConfig.allowedOrigins.includes(origin as AllowedOrigin)
    ) {
      res.header("Access-Control-Allow-Credentials", "true");
    }
    next();
  };
}
