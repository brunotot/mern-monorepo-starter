import HttpStatus from "http-status";
import type { ErrorLog } from "./../domain/ErrorLog";
import type { HttpResponseStatus } from "../../types";

export class ErrorResponse extends Error {
  stack: string | undefined;
  content: Omit<ErrorLog, "_id">;

  constructor(
    originalUrl: string,
    status: HttpResponseStatus,
    details: string,
    metadata: Record<string, unknown> = {},
  ) {
    super(HttpStatus[`${status}_MESSAGE`]);
    this.stack = new Error().stack ?? "";
    this.content = this.#buildErrorLog(originalUrl, status, details, metadata);
  }

  #buildErrorLog(
    originalUrl: string,
    status: HttpResponseStatus,
    details: string = "Unknown",
    metadata: Record<string, unknown> = {},
  ): Omit<ErrorLog, "_id"> {
    return {
      status: status,
      details: details,
      metadata: metadata,
      message: HttpStatus[`${status}_MESSAGE`],
      path: originalUrl,
      timestamp: new Date().toISOString(),
    };
  }
}
