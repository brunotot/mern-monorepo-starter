import { Request } from "express";
import HttpStatus from "http-status";
import { HttpStatusNumeric, z } from "../../config";

export class ErrorResponse extends Error {
  stack: string | undefined;
  content: ErrorResponseContent;

  constructor(
    req: Request,
    status: HttpStatusNumeric,
    details: string,
    metadata: Record<string, unknown> = {},
  ) {
    super(HttpStatus[`${status}_MESSAGE`]);
    this.stack = new Error().stack ?? "";
    this.content = this.#buildErrorResponseContent(req, status, details, metadata);
  }

  #buildErrorResponseContent(
    req: Request,
    status: HttpStatusNumeric,
    details: string,
    metadata: Record<string, unknown> = {},
  ): ErrorResponseContent {
    const errorCode = HttpStatus[`${status}_NAME`];
    const message = HttpStatus[`${status}_MESSAGE`];
    const timestamp = new Date().toISOString();
    const path = req.originalUrl;

    return {
      status,
      message,
      errorCode,
      details,
      path,
      timestamp,
      metadata,
    };
  }
}

export const ErrorResponseContent = z.object({
  details: z.string().optional().openapi({
    example: "Username and password are required.",
  }),
  status: z.number().openapi({
    example: 422,
  }),
  message: z.string().openapi({
    example: "Unprocessable Entity",
  }),
  errorCode: z.string().openapi({
    example: "UNPROCESSABLE_ENTITY",
  }),
  path: z.string().openapi({
    example: "/auth/login",
  }),
  timestamp: z.string().openapi({
    example: "2024-01-01T00:00:00.000Z",
  }),
  metadata: z
    .record(z.unknown())
    .default({})
    .optional()
    .openapi({
      example: [
        {
          code: "invalid_type",
          expected: "string",
          received: "undefined",
          path: ["username"],
          message: "Required",
        },
      ],
    }),
});

export type ErrorResponseContent = z.infer<typeof ErrorResponseContent>;
