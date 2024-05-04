import { Environment, JwtManager } from "@org/backend/config";
import type { RequestHandler } from "express";
import { type ErrorResponse } from "@org/shared";

export function withJwt(tokenType: "access" | "refresh" = "access"): RequestHandler {
  const tokenSecret =
    Environment.getInstance().vars[
      tokenType === "access" ? "ACCESS_TOKEN_SECRET" : "REFRESH_TOKEN_SECRET"
    ];
  return async (req, res, next) => {
    const jwtManager = JwtManager.getBy(req);
    try {
      const result = await jwtManager.verifyToken(tokenSecret);
      res.locals.tokenData = result;
      next();
    } catch (error) {
      const typedError = error as ErrorResponse;
      const content = typedError.content;
      res.status(content.status).send(content);
    }
  };
}
