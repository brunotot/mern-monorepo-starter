/* eslint-disable no-console */

import type express from "express";
import { buildOpenAPIObject, contracts } from "@org/lib-api-client";
import { initServer, createExpressEndpoints } from "@ts-rest/express";
import swaggerUi from "swagger-ui-express";
import { TsRestRouterService } from "@/lib/@ts-rest";

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
  oauth2AuthorizationUrl: string;
  oauth2TokenUrl: string;
  version: string;
  cssPath: string;
  jsPath: string;
  endpoint: string;
}): void {
  // this is good and it's value is url "/oauth2-redirect.html"
  const oauth2RedirectUrl = props.oauth2RedirectUrl;

  // this is something i've tried to do to fix it but doesn't help.
  // value is: "/auth", prefixed with keycloak url
  const oauth2AuthorizationUrl = props.oauth2AuthorizationUrl;

  // this was also some try to fix but this actually doesn't do anything
  // value is: "/token", prefixed with keycloak url
  const oauth2TokenUrl = props.oauth2TokenUrl;

  const openApiDocument = buildOpenAPIObject({
    version: props.version,
    authorizationUrl: oauth2AuthorizationUrl,
    tokenUrl: oauth2TokenUrl,
  });

  props.app.use(
    props.endpoint,
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, {
      swaggerOptions: {
        oauth2RedirectUrl,
        /*authAction: {
          oauth2: {
            clientId: "admin-cli", // Your Keycloak client ID
            appName: "Swagger UI",
            usePkceWithAuthorizationCodeGrant: true, // Enable PKCE for enhanced security
          },
        },*/
      },
      customCssUrl: props.cssPath,
      customJs: props.jsPath,
    }),
  );

  props.app.get(`${props.endpoint}.json`, (_req, res) => {
    res.json(openApiDocument);
  });
}
