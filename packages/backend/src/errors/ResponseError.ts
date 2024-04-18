import { Request } from "express";
import HttpStatus from "http-status";
import { z } from "zod";
import { HttpStatusNumeric } from "../config";

function buildErrorResponseContent(
  req: Request,
  status: HttpStatusNumeric,
  details: string,
  stack: string[],
): ErrorResponseContent {
  const errorCode = HttpStatus[`${status}_NAME`];
  const message = HttpStatus[`${status}_MESSAGE`];
  const timestamp = new Date().toISOString();
  const path = req.originalUrl;
  const clientIp = req.ip;

  return {
    status,
    message,
    errorCode,
    details,
    path,
    timestamp,
    clientIp,
    stack,
  };
}

export class ErrorResponse extends Error {
  stack: string | undefined;
  content: ErrorResponseContent;

  constructor(req: Request, status: HttpStatusNumeric, details: string) {
    super(HttpStatus[`${status}_MESSAGE`]);
    this.stack = new Error().stack ?? "";
    const [, ...localStack] = this.stack.split("\n").map((line: string) => line.trim());
    this.content = buildErrorResponseContent(req, status, details, localStack);
  }
}

export const ErrorResponseContent = z.object({
  details: z.string().optional(),
  status: z.number(),
  message: z.string(),
  errorCode: z.string(),
  path: z.string(),
  timestamp: z.string(),
  clientIp: z.string().optional(),
  stack: z.array(z.string()).default([]),
});

export type ErrorResponseContent = z.infer<typeof ErrorResponseContent>;
