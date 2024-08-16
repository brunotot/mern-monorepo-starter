import type { Role } from "@org/shared";
import type { RequestHandler } from "express";

export function withUserRoles(...allowedRoles: Role[]): RequestHandler {
  return function (req, res, next) {
    const roles: Role[] = res.locals.roles ?? [];
    const result = roles.map(role => allowedRoles.includes(role)).find(val => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
}
