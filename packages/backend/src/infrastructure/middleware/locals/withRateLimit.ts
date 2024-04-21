import type { RequestHandler } from "express";
import type { Options } from "express-rate-limit";
import { rateLimit } from "express-rate-limit";

export type ExpressRateLimitOptions = Partial<Options>;

const DEFAULT_RATE_LIMIT_OPTIONS: ExpressRateLimitOptions = {
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
};

export function withRateLimit(options?: ExpressRateLimitOptions): RequestHandler {
  return rateLimit({
    ...DEFAULT_RATE_LIMIT_OPTIONS,
    ...options,
  });
}
