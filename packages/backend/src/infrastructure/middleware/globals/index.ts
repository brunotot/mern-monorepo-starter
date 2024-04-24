import {
  withCompressionMiddleware,
  withCookieParserMiddleware,
  withCorsMiddleware,
  withCredentialsMiddleware,
  withExpressOverridesMiddleware,
  withHelmetMiddleware,
  withHppMiddleware,
  withJsonParserMiddleware,
  withMorganMiddleware,
  withUrlEncodedMiddleware
} from "@infrastructure";

export const GLOBAL_MIDDLEWARES = [
  withMorganMiddleware,
  withCredentialsMiddleware,
  withCorsMiddleware,
  withHppMiddleware,
  withHelmetMiddleware,
  withCompressionMiddleware,
  withJsonParserMiddleware,
  withUrlEncodedMiddleware,
  withCookieParserMiddleware,
  withExpressOverridesMiddleware,
];
