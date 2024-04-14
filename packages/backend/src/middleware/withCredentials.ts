import { $BackendAppConfig, AllowedOrigin } from "../config";
import { ExpressMiddleware } from "./types";

export function withCredentials(): ExpressMiddleware {
  return (req, res, next) => {
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
