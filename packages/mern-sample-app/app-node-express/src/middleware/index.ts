import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";

import { withStaticAssets } from "@org/app-node-express/middleware/withStaticAssets";
import { withContext } from "@org/app-node-express/middleware/withContext";
import { withCompression } from "@org/app-node-express/middleware/withCompression";
import { withCookieParser } from "@org/app-node-express/middleware/withCookieParser";
import { withCors } from "@org/app-node-express/middleware/withCors";
import { withCredentials } from "@org/app-node-express/middleware/withCredentials";
import { withCsp } from "@org/app-node-express/middleware/withCsp";
import { withHpp } from "@org/app-node-express/middleware/withHpp";
import { withJsonParser } from "@org/app-node-express/middleware/withJsonParser";
import { withMorgan } from "@org/app-node-express/middleware/withMorgan";
import { withUrlEncoded } from "@org/app-node-express/middleware/withUrlEncoded";
import { withSession } from "@org/app-node-express/middleware/withSession";
import { withAuthorization } from "@org/app-node-express/middleware/withAuthorization";

// Order matters!

export const middleware = [
  withStaticAssets, // withStaticAssets should always be on top!
  withContext,
  withCompression,
  withCookieParser,
  withCors,
  withCredentials,
  withCsp,
  withHpp,
  withJsonParser,
  withMorgan,
  withUrlEncoded,
  withSession,
  withAuthorization,
] as const satisfies RouteMiddlewareFactory[];
