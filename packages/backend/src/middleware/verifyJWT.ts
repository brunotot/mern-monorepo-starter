import { TODO } from "@org/shared";
import type { NextFunction, Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { $BackendAppConfig } from "../config";

export function verifyJWT() {
  return function (req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    const authHeaderSanitized = Array.isArray(authHeader)
      ? authHeader[0]
      : authHeader;
    if (!authHeaderSanitized?.startsWith("Bearer ")) return res.sendStatus(401);
    const token = authHeaderSanitized.split(" ")[1];
    // console.log(token);
    jwt.verify(
      token,
      $BackendAppConfig.env.ACCESS_TOKEN_SECRET,
      (err: VerifyErrors | null, decoded: TODO) => {
        if (err) return res.sendStatus(403); //invalid token
        res.locals.user = decoded.UserInfo.username;
        res.locals.roles = decoded.UserInfo.roles;
        next();
      }
    );
  };
}
