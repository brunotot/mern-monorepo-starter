import { withAuthorization } from "@org/app-node-express/infrastructure/middleware/withAuthorization";
import { withMorgan } from "@org/app-node-express/infrastructure/middleware/withMorgan";
import { withRouteContext } from "@org/app-node-express/infrastructure/middleware/withRouteContext";
import { withRouteSession } from "@org/app-node-express/infrastructure/middleware/withRouteSession";
import { type RouteMiddlewareFactory } from "@org/app-node-express/lib/@ts-rest";
import { withCompression } from "@org/app-node-express/middleware/withCompression";
import { withCookieParser } from "@org/app-node-express/middleware/withCookieParser";
import { withCors } from "@org/app-node-express/middleware/withCors";
import { withCredentials } from "@org/app-node-express/middleware/withCredentials";
import { withCsp } from "@org/app-node-express/middleware/withCsp";
import { withHpp } from "@org/app-node-express/middleware/withHpp";
import { withJsonParser } from "@org/app-node-express/middleware/withJsonParser";
import { withStaticAssets } from "@org/app-node-express/middleware/withStaticAssets";
import { withUrlEncoded } from "@org/app-node-express/middleware/withUrlEncoded";

// Order matters!

export const middleware = [
  withStaticAssets(), // withStaticAssets should always be on top!
  withRouteSession(),
  withRouteContext(),
  withCompression(),
  withCookieParser(),
  withCors(),
  withCredentials(),
  withCsp(),
  withHpp(),
  withJsonParser(),
  withMorgan(),
  withUrlEncoded(),
  withAuthorization(),
] as const satisfies RouteMiddlewareFactory[];
