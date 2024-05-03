import type { RequestHandler, Request } from "express";
import { type MongoPaginationOptions, type MongoSort } from "@org/backend/types";

function buildPaginationOptions(req: Request): MongoPaginationOptions {
  const query = req.query;
  const page = query.page ? parseInt(query.page as string) : 0;
  const limit = query.limit ? parseInt(query.limit as string) : 10;
  const sort = query.sort ? (query.sort as string).split(",").map(value => value.split("|")) : [];
  const textSearch = (query.search as string) ?? "";
  return {
    filters: {},
    sort: sort as MongoSort,
    page,
    limit,
    search: {
      fields: ["username", "email"],
      regex: textSearch,
    },
  };
}

export function withPaginableParams(): RequestHandler {
  return function (req, res, next) {
    res.locals.paginationOptions = buildPaginationOptions(req);
    next();
  };
}
