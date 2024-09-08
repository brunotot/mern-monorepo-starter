import type { AppRouteImplementation } from "@ts-rest/express";
import type { AppRoute, ServerInferResponses } from "@ts-rest/core";
import type { RequestHandler } from "express";

export type RouteOutput<Route extends AppRoute> = Promise<ServerInferResponses<Route>>;

export type RouteInput<Route extends AppRoute> = Parameters<AppRouteImplementation<Route>>[0];

export type RouteHandler<Route extends AppRoute> = (data: RouteInput<Route>) => RouteOutput<Route>;

export type RouteMiddlewareFactory = () => RequestHandler | RequestHandler[];
