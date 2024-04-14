import type { NextFunction, Request, Response } from "express";
import { Role } from "../config/vars/userRoles";

export function verifyRoles(...allowedRoles: Role[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    const roles: Role[] = res.locals.roles ?? [];
    const result = roles
      .map((role) => allowedRoles.includes(role))
      .find((val) => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
}
