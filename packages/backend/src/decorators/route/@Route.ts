// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TODO } from "@org/shared";

import { createMethodDecorator } from "@tsvdec/decorators";
import type { Request, Response } from "express";
import HttpStatus from "http-status";

import type { HttpStatusNumeric, SwaggerPath } from "@types";

import type { RequestMappingProps, RouteHandler } from "@internal";
import {
  ErrorResponse,
  InjectionDecoratorManager,
  RouteDecoratorManager,
  buildSwaggerBody,
  errorLogDomain,
  inject,
} from "@internal";

export type RouteProps = Omit<RequestMappingProps, "name" | "middlewares"> & {
  swagger?: SwaggerPath;
};

function getRouteErrorStatuses(routeFnSource: string): HttpStatusNumeric[] {
  function extractErrorStatusCodes(input: string): string[] {
    const pattern = /res\.sendError\(\s*([\w.]+)\s*[),]/g;
    let matches: RegExpExecArray | null;
    const statusCodes: string[] = [];

    while ((matches = pattern.exec(input)) !== null) {
      statusCodes.push(matches[1]);
    }

    return statusCodes;
  }
  const statusCodesSet = new Set<HttpStatusNumeric>();
  const statusCodes = extractErrorStatusCodes(routeFnSource);
  statusCodes.forEach(t => statusCodesSet.add(eval(t)));
  return [...statusCodesSet] as HttpStatusNumeric[];
}

export function Route<This, Fn extends RouteHandler>({ swagger = {}, ...props }: RouteProps) {
  return createMethodDecorator<This, Fn>(({ target, meta }) => {
    const context = meta.context;
    const routeErrorStatuses = getRouteErrorStatuses(target.toString());

    async function handler(req: Request, res: Response) {
      try {
        const container = InjectionDecoratorManager.from(context).value.name;
        const _this = inject(container);
        return await target.call(_this, req, res);
      } catch (error: TODO) {
        if (error instanceof ErrorResponse) {
          await new errorLogDomain.db(error.content).save();
          return res.status(error.content.status).json(error.content);
        }

        const fallbackErrorContent = new ErrorResponse(
          req,
          HttpStatus.INTERNAL_SERVER_ERROR,
          error.message,
        ).content;

        return res.status(fallbackErrorContent.status).json(fallbackErrorContent);
      }
    }

    RouteDecoratorManager.from(context).addRoute({
      ...props,
      name: String(context.name),
      middlewares: [],
      handler,
      swagger: {
        ...swagger,
        responses: {
          ...(swagger.responses ?? {}),
          ...routeErrorStatuses.reduce(
            (acc, status) => ({
              ...acc,
              [status]: { description: HttpStatus[`${status}_MESSAGE`] },
            }),
            {},
          ),
          [HttpStatus.INTERNAL_SERVER_ERROR]: {
            description: HttpStatus["500_MESSAGE"],
          },
          default: {
            description:
              "This response is used across all API endpoints to provide a standardized error payload whenever an error occurs. It ensures consistent error handling and format throughout the API.",
            content: buildSwaggerBody(errorLogDomain.zod).content,
          },
        },
      },
    });

    return handler as Fn;
  });
}
