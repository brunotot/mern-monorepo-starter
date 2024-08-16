import { withCompressionMiddleware } from "@org/backend/infrastructure/middleware/global/withCompression";
import { withCookieParserMiddleware } from "@org/backend/infrastructure/middleware/global/withCookieParser";
import { withCorsMiddleware } from "@org/backend/infrastructure/middleware/global/withCors";
import { withCredentialsMiddleware } from "@org/backend/infrastructure/middleware/global/withCredentials";
import { withHelmetMiddleware } from "@org/backend/infrastructure/middleware/global/withHelmet";
import { withHppMiddleware } from "@org/backend/infrastructure/middleware/global/withHpp";
import { withJsonParserMiddleware } from "@org/backend/infrastructure/middleware/global/withJsonParser";
import { withMorganMiddleware } from "@org/backend/infrastructure/middleware/global/withMorgan";
import { withUrlEncodedMiddleware } from "@org/backend/infrastructure/middleware/global/withUrlEncoded";
import { withStaticAssetsMiddleware } from "@org/backend/infrastructure/middleware/global/withStaticAssets"

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
