import { createMethodDecorator } from "@tsvdec/decorators";
import { Request, Response } from "express";
import { inject } from "../config";
import { InjectionMetaService } from "../meta/InjectionMetaService";
import {
  RequestMappingProps,
  RouteHandler,
  RoutesMetaService,
} from "../meta/RoutesMetaService";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TODO } from "@org/shared";
import HttpStatus from "http-status";
import { SwaggerPath } from "../config";

export type RouteProps = Omit<RequestMappingProps, "name" | "middlewares"> & {
  swagger?: SwaggerPath;
};

export function Route<This, Fn extends RouteHandler>({
  swagger = {},
  ...props
}: RouteProps) {
  return createMethodDecorator<This, Fn>(({ target, meta }) => {
    const context = meta.context;
    //const name = String(context.name!);

    async function handler(req: Request, res: Response) {
      try {
        const container = InjectionMetaService.from(context).value.name;
        const _this = inject(container);
        return await target.call(_this, req, res);
      } catch (error: TODO) {
        const message: string = error.message;
        const [, ...stack] = error.stack
          .split("\n")
          .map((line: string) => line.trim());
        const response = { message, stack };
        res.status(500).send(response);
      }
    }

    RoutesMetaService.from(context).addRoute({
      ...props,
      name: String(context.name),
      middlewares: [],
      handler,
      swagger: {
        ...swagger,
        responses: {
          [HttpStatus.INTERNAL_SERVER_ERROR]: {
            description: "Internal server error",
          },
          ...(swagger.responses ?? {}),
        },
      },
    });

    return handler as Fn;
  });
}
