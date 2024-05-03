import { withCompressionMiddleware } from "@org/backend/infrastructure/middleware/globals/withCompression";
import { withCookieParserMiddleware } from "@org/backend/infrastructure/middleware/globals/withCookieParser";
import { withCorsMiddleware } from "@org/backend/infrastructure/middleware/globals/withCors";
import { withCredentialsMiddleware } from "@org/backend/infrastructure/middleware/globals/withCredentials";
import { withHelmetMiddleware } from "@org/backend/infrastructure/middleware/globals/withHelmet";
import { withHppMiddleware } from "@org/backend/infrastructure/middleware/globals/withHpp";
import { withJsonParserMiddleware } from "@org/backend/infrastructure/middleware/globals/withJsonParser";
import { withMorganMiddleware } from "@org/backend/infrastructure/middleware/globals/withMorgan";
import { withUrlEncodedMiddleware } from "@org/backend/infrastructure/middleware/globals/withUrlEncoded";
import { withStaticAssetsMiddleware } from "@org/backend/infrastructure/middleware/globals/withStaticAssets"

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
  withStaticAssetsMiddleware
];
