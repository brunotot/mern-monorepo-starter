import { AbstractDomain, makeDomain } from "@internal";
import mongoose from "mongoose";
import z from "zod";

export const errorLogDomain = makeDomain(
  class extends AbstractDomain {
    zod = z
      .object({
        details: z.string().min(0).openapi({
          example: "Request body validation error",
        }),
        status: z.number().openapi({
          example: 400,
        }),
        message: z.string().openapi({
          example:
            "The server cannot or will not process the request due to an apparent client error.",
        }),
        path: z.string().openapi({
          example: "/auth/login",
        }),
        timestamp: z.string().openapi({
          example: "2024-01-01T00:00:00.000Z",
        }),
        metadata: z
          .record(z.string(), z.any())

          .openapi({
            example: {
              errors: [
                "[password] String must contain at least 1 character(s)",
                "[username] String must contain at least 1 character(s)",
              ],
            },
          }),
      })
      .describe("ErrorLog");

    schema = new mongoose.Schema<z.infer<typeof this.zod>>(
      {
        details: { type: String, required: true },
        status: { type: Number, required: true },
        message: { type: String, required: true },
        path: { type: String, required: true },
        timestamp: { type: String, required: true },
        metadata: { type: Object },
      },
      { capped: 2048 },
    );
  },
);

export type ErrorLog = z.infer<(typeof errorLogDomain)["zod"]>;
