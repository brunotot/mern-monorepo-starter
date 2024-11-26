/**
 * @packageDocumentation Defines utility types for route input/output handling and middleware in a TypeScript-Express application.
 * @see {@link https://www.npmjs.com/package/@ts-rest/core @ts-rest/core}
 * @see {@link https://www.npmjs.com/package/@ts-rest/express @ts-rest/express}
 * @see {@link https://www.npmjs.com/package/express express}
 * @why These types standardize how route input, output, and middleware are defined and handled in the application, ensuring strong typing and consistency across routes.
 */

import type { AppRoute, ServerInferResponses } from "@org/lib-api-client";
import type { TODO } from "@org/lib-commons";
import type { AppRouteImplementation } from "@ts-rest/express";
import type { RequestHandler } from "express";

/**
 * Represents the output of a route, resolving to the server's inferred response type.
 * @typeParam Route - {@link https://github.com/ts-rest/ts-rest/blob/main/libs/ts-rest/core/src/lib/dsl.ts#L169 AppRoute}
 */
export type RouteOutput<Route extends AppRoute> = Promise<ServerInferResponses<Route>>;

/**
 * Represents the input parameters of a route, inferred from the app route implementation.
 * @typeParam Route - {@link https://github.com/ts-rest/ts-rest/blob/main/libs/ts-rest/core/src/lib/dsl.ts#L169 AppRoute}
 */
export type RouteInput<Route extends AppRoute> = Parameters<AppRouteImplementation<Route>>[0];

/**
 * Represents a handler function for a route, taking the route input and returning the route output.
 * @typeParam Route - {@link https://github.com/ts-rest/ts-rest/blob/main/libs/ts-rest/core/src/lib/dsl.ts#L169 AppRoute}
 */
export type RouteHandler<Route extends AppRoute> = (data: RouteInput<Route>) => RouteOutput<Route>;

/**
 * Represents a handler function for any route, taking any data and returning any output.
 */
export type UntypedRouteHandler = (data: TODO) => TODO;

/**
 * Represents a factory for generating an array of Express middleware request handlers.
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/express/index.d.ts#L112 RequestHandler}
 */
export type RouteMiddlewareFactory = () => RequestHandler[];
