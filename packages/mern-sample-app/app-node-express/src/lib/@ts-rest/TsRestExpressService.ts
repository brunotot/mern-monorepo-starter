/* eslint-disable no-console */
import type express from "express";

import { buildOpenAPIObject, contracts } from "@org/lib-api-client";
import { initServer, createExpressEndpoints } from "@ts-rest/express";
import swaggerUi from "swagger-ui-express";

import { TsRestRouterService } from "./TsRestRouterService";

export function initializeExpressRoutes(app: express.Application): void {
  const s = initServer();
  const contractsRouter = TsRestRouterService.getInstance().getRouters();
  const router = s.router(contracts, contractsRouter);
  function suppressConsole<T>(handler: () => T): T {
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
    };

    console.log = console.warn = console.error = function () {};

    try {
      return handler();
    } finally {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
    }
  }
  suppressConsole(() => createExpressEndpoints(contracts, router, app));
  // createExpressEndpoints(contracts, router, app);
}

export function initializeSwagger(props: {
  app: express.Application;
  oauth2RedirectUrl: string;
  version: string;
  cssPath: string;
  jsPath: string;
  endpoint: string;
}): void {
  const oauth2RedirectUrl = props.oauth2RedirectUrl;

  const openApiDocument = buildOpenAPIObject({
    version: props.version,
    authorizationUrl: oauth2RedirectUrl,
  });

  props.app.use(
    props.endpoint,
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, {
      swaggerOptions: { oauth2RedirectUrl },
      customCssUrl: props.cssPath,
      customJs: props.jsPath,
    }),
  );
}
