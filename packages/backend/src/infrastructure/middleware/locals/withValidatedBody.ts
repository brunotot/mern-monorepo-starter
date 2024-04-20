// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TODO } from "@org/shared";

import { RequestHandler } from "express";
import { AnyZodObject } from "zod";
import { ErrorResponse } from "../../errors";

export function withValidatedBody(schema: AnyZodObject): RequestHandler {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e: TODO) {
      const errorResponse = new ErrorResponse(req, 400, "Request body validation error", e.errors);
      const errorContent = errorResponse.content;
      res.status(errorContent.status).json(errorContent);
    }
  };
}
