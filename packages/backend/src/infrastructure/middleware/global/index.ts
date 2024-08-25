import { type RouteMiddlewareFactory } from "@org/backend/config/singletons/RouterCollection";

import { withCompression } from "@org/backend/infrastructure/middleware/global/withCompression";
import { withContext } from "@org/backend/infrastructure/middleware/global/withContext"
import { withCookieParser } from "@org/backend/infrastructure/middleware/global/withCookieParser";
import { withCors } from "@org/backend/infrastructure/middleware/global/withCors";
import { withCredentials } from "@org/backend/infrastructure/middleware/global/withCredentials";
import { withCsp } from "@org/backend/infrastructure/middleware/global/withCsp"
import { withHpp } from "@org/backend/infrastructure/middleware/global/withHpp";
import { withJsonParser } from "@org/backend/infrastructure/middleware/global/withJsonParser";
import { withMorgan } from "@org/backend/infrastructure/middleware/global/withMorgan";
import { withStaticAssets } from "@org/backend/infrastructure/middleware/global/withStaticAssets"
import { withUrlEncoded } from "@org/backend/infrastructure/middleware/global/withUrlEncoded";
import { withSession } from "@org/backend/infrastructure/middleware/global/withSession";
import { withKeycloak } from "@org/backend/infrastructure/middleware/global/withKeycloak";

export const GLOBAL_MIDDLEWARES: RouteMiddlewareFactory[] = [
  withCompression,
  withContext,
  withCookieParser,
  withCors,
  withCredentials,
  withCsp,
  withHpp,
  withJsonParser,
  withMorgan,
  withStaticAssets,
  withUrlEncoded,
  withSession,
  withKeycloak
];
