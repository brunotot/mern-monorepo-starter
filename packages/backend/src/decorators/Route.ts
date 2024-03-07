import { NextFunction, Request, Response, Router } from "express";
import { inject } from "../config";

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

export type RequestMappingProps = {
  method: RouteMethod;
  path?: string;
  middlewares?: Array<RouteMiddleware>;
};

const router = Router();

export function getRouter() {
  return router;
}

export type RequestRoute = RequestMappingProps & { handler: RouteHandler };

const addRoute = (requestRoute: RequestRoute) => {
  const { method, path, middlewares, handler } = requestRoute;
  const fullPath = `${path}`;
  const pipeline = middlewares ? [...middlewares, handler] : [handler];
  router[method](fullPath, ...pipeline);
};

export function Route<
  This,
  Fn extends (req: Request, res: Response) => Promise<void>
>(props: RequestMappingProps) {
  return function (target: Fn, context: ClassMethodDecoratorContext<This, Fn>) {
    const methodName = context.name;
    const containerName: string = context.metadata!.injectionName as string;

    async function handler(req: Request, res: Response): Promise<void> {
      try {
        return await target.call(inject(containerName), req, res);
      } catch (error: any) {
        const message: string = error.message;
        const [, ...stack] = error.stack
          .split("\n")
          .map((line: string) => line.trim());
        const response = { message, stack };
        res.status(500).send(response);
      }
    }

    addRoute({ ...props, handler });
    return handler;
  };
}
