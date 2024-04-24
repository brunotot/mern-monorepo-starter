import { withCompressionMiddleware } from "@infrastructure/middleware/globals/withCompression";
import { withCookieParserMiddleware } from "@infrastructure/middleware/globals/withCookieParser";
import { withCorsMiddleware } from "@infrastructure/middleware/globals/withCors";
import { withCredentialsMiddleware } from "@infrastructure/middleware/globals/withCredentials";
import { withExpressOverridesMiddleware } from "@infrastructure/middleware/globals/withExpressOverrides";
import { withHelmetMiddleware } from "@infrastructure/middleware/globals/withHelmet";
import { withHppMiddleware } from "@infrastructure/middleware/globals/withHpp";
import { withJsonParserMiddleware } from "@infrastructure/middleware/globals/withJsonParser";
import { withMorganMiddleware } from "@infrastructure/middleware/globals/withMorgan";
import { withUrlEncodedMiddleware } from "@infrastructure/middleware/globals/withUrlEncoded";

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
