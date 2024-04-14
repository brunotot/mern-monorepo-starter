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

export function Route<This, Fn extends RouteHandler>(
  props: Omit<RequestMappingProps, "name" | "middlewares">
) {
  return createMethodDecorator<This, Fn>(({ target, meta }) => {
    const context = meta.context;

    async function handler(req: Request, res: Response) {
      try {
        InjectionMetaService.from(context).value.name;
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
    });

    return handler as Fn;
  });
}
