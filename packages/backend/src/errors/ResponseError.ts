import type { Request } from "express";
import HttpStatus from "http-status";

import type { HttpResponseStatus } from "@config";
import type { ErrorLog } from "@models";

export class ErrorResponse extends Error {
  stack: string | undefined;
  content: Omit<ErrorLog, "_id">;

  constructor(
    req: Request,
    status: HttpResponseStatus,
    details: string,
    metadata: Record<string, unknown> = {},
  ) {
    super(HttpStatus[`${status}_MESSAGE`]);
    this.stack = new Error().stack ?? "";
    this.content = this.#buildErrorLog(req, status, details, metadata);
  }

  #buildErrorLog(
    req: Request,
    status: HttpResponseStatus,
    details: string = "Unknown",
    metadata: Record<string, unknown> = {},
  ): Omit<ErrorLog, "_id"> {
    return {
      status: status,
      details: details,
      metadata: metadata,
      message: HttpStatus[`${status}_MESSAGE`],
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
    };
  }
}
