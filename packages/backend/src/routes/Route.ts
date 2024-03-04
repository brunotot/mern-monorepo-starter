import { NextFunction, Request, Response, Router } from "express";

export type RouteMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export type RouteMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type RouteHandler = (req: Request, res: Response) => Promise<void>;

export type RouteEndpoint = {
  method: RouteMethod;
  path: string;
  handler: RouteHandler;
  middlewares?: Array<RouteMiddleware>;
};

export abstract class Route {
  #path: string;
  #router = Router();

  get path(): string {
    return this.#path;
  }

  get router(): Router {
    return this.#router;
  }

  protected abstract endpoints(): RouteEndpoint[];

  constructor(path: string) {
    this.#path = path;
  }

  public setupEndpoints() {
    this.endpoints().forEach((route) => {
      const { method, path, middlewares, handler } = route;
      const fullPath = `${this.path}${path}`;
      const pipeline = middlewares ? [...middlewares, handler] : [handler];
      this.router[method](fullPath, ...pipeline);
    });
  }
}
