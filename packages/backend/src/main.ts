import "./index";
import "./config";
/*import { App } from "./App";

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // mandatory (as per the Node.js docs)
});

function main() {
  const app = new App();
  app.listen();
}

main();*/

// main.ts

import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { type TODO, Contracts, ContractName } from "@org/shared";
import { generateOpenApi } from "@ts-rest/open-api";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
const app = express();
import * as swaggerUi from "swagger-ui-express";
import { Bottle, ContractManager } from "./config";
Bottle.getInstance().iocStartup();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

function buildOptimizedRouters() {
  const routers = ContractManager.getInstance().getRouters();

  const optimizedRouterObj: TODO = {};

  Object.keys(routers).forEach(key => {
    const router = routers[key];
    const routerMethods: TODO = {};
    Object.keys(router).forEach(methodKey => {
      routerMethods[methodKey] = {
        handler: async (data: TODO) => {
          try {
            return router[methodKey](data);
          } catch (err) {
            return { status: 500 };
          }
        },
        middleware: [],
      };
    });
    optimizedRouterObj[key] = routerMethods;
  });

  return optimizedRouterObj;
}

const router = s.router(Contracts, buildOptimizedRouters());

const hasCustomTags = (metadata: unknown): metadata is { openApiTags: string[] } => {
  return !!metadata && typeof metadata === "object" && "openApiTags" in metadata;
};

const openApiDocument = generateOpenApi(
  Contracts,
  {
    info: {
      title: "Posts API",
      version: "1.0.0",
    },
  },
  {
    operationMapper: (operation, appRoute) => ({
      ...operation,
      ...(hasCustomTags(appRoute.metadata)
        ? {
            tags: appRoute.metadata.openApiTags,
          }
        : {}),
    }),
  },
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));

createExpressEndpoints(Contracts, router, app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
