import { type RouteMiddlewareFactory } from "@org/app-node-express/config/Route.config";

import { withCompression } from "@org/app-node-express/infrastructure/middleware/global/withCompression";
import { withContext } from "@org/app-node-express/infrastructure/middleware/global/withContext";
import { withCookieParser } from "@org/app-node-express/infrastructure/middleware/global/withCookieParser";
import { withCors } from "@org/app-node-express/infrastructure/middleware/global/withCors";
import { withCredentials } from "@org/app-node-express/infrastructure/middleware/global/withCredentials";
import { withCsp } from "@org/app-node-express/infrastructure/middleware/global/withCsp";
import { withHpp } from "@org/app-node-express/infrastructure/middleware/global/withHpp";
import { withJsonParser } from "@org/app-node-express/infrastructure/middleware/global/withJsonParser";
import { withMorgan } from "@org/app-node-express/infrastructure/middleware/global/withMorgan";
import { withStaticAssets } from "@org/app-node-express/infrastructure/middleware/global/withStaticAssets";
import { withUrlEncoded } from "@org/app-node-express/infrastructure/middleware/global/withUrlEncoded";
import { withSession } from "@org/app-node-express/infrastructure/middleware/global/withSession";
import { withKeycloak } from "@org/app-node-express/infrastructure/middleware/global/withKeycloak";

export const middleware = [
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
  withKeycloak,
] as const satisfies RouteMiddlewareFactory[];
