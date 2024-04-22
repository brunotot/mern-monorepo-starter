import { Environment } from "@internal";
import type { TODO } from "@org/shared";
import type { RequestHandler } from "express";
import type { VerifyErrors } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export function withJwt(): RequestHandler {
  return (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const authHeaderSanitized = Array.isArray(authHeader) ? authHeader[0] : authHeader;
    if (!authHeaderSanitized?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeaderSanitized.split(" ")[1];
    // console.log(token);
    jwt.verify(
      token,
      Environment.getInstance().vars.ACCESS_TOKEN_SECRET,
      (err: VerifyErrors | null, decoded: TODO) => {
        if (err) return res.sendStatus(403); //invalid token
        res.locals.user = decoded.UserInfo.username;
        res.locals.roles = decoded.UserInfo.roles;
        next();
      },
    );
  };
}
