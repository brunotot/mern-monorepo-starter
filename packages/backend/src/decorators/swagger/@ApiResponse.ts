import type { MethodDecoratorDef } from "@tsvdec/decorators";
import { createMethodDecorator } from "@tsvdec/decorators";
import type z from "zod";

import { RouteDecoratorManager, Swagger } from "@config";
import type { HttpResponseStatus, RouteHandler } from "@models";

export function ApiResponse<This, Fn extends RouteHandler>(
  status: HttpResponseStatus,
  description: string,
  body?: z.AnyZodObject,
): MethodDecoratorDef<This, Fn> {
  return createMethodDecorator<This, Fn>(({ meta }) => {
    const routeName = String(meta.context.name);
    const routeService = RouteDecoratorManager.from(meta.context);
    routeService.updateRoute(routeName, r => ({
      ...r,
      swagger: {
        ...(r.swagger ?? {}),
        responses: {
          ...(r.swagger?.responses ?? {}),
          [status]: {
            description,
            content: body ? Swagger.getInstance().buildSwaggerBody(body).content : undefined,
          },
        },
      },
    }));
  });
}
