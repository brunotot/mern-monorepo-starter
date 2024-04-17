// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { TODO } from "@org/shared";

import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const withValidatedBody =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e: TODO) {
      return res.status(400).send(e.errors);
    }
  };
