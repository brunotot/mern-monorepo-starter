import { Role } from "@org/shared";
import { ExpressMiddleware } from "./types";

export function withUserRoles(...allowedRoles: Role[]): ExpressMiddleware {
  return function (req, res, next) {
    const roles: Role[] = res.locals.roles ?? [];
    const result = roles.map(role => allowedRoles.includes(role)).find(val => val === true);
    if (!result) return res.sendStatus(401);
    next();
  };
}
