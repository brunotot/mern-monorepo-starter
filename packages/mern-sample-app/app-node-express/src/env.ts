/**
 * @packageDocumentation
 *
 * ## Overview
 * This module is responsible for parsing, validating, and managing environment variables for the Express application.
 * It uses `zod` schemas to ensure that all required environment variables are present and correctly typed. The module
 * also integrates `dotenv` to load variables from `.env` files, allowing configuration across different environments like
 * development, testing, and production.
 *
 * ## Features
 * - Validates environment variables using `zod` schemas
 * - Automatically loads environment variables from `.env.[environment].local`
 * - Handles MongoDB and Keycloak configuration
 * - Parses and transforms CORS, Keycloak, and Swagger-related settings
 * - Provides fallback default values for non-mandatory variables
 *
 * ## How to Use
 * ```ts
 * import { env } from "@org/app-node-express/env";
 *
 * // Access the validated environment variables
 * console.log(env.SERVER_PORT);
 * console.log(env.DATABASE_URL);
 * ```
 *
 * For test environments, you can check with:
 * ```ts
 * import { testMode } from "@org/app-node-express/env";
 *
 * if (testMode()) {
 *   console.log("Running in test mode");
 * }
 * ```
 *
 * ## Environment variables list
 *
 * | Name                    | Description                                     | Default value                  | Example value                 | Mandatory |
 * |-------------------------|-------------------------------------------------|--------------------------------|-------------------------------|-----------|
 * | __CORS_CREDENTIALS__    | Use CORS credentials                            | `true`                         | `true`                        |    ⚫     |
 * | CORS_ALLOWED_ORIGINS    | List of comma-separated allowed origin patterns | `*`                            | `http://localhost:5173`       |    ⚫     |
 * | CORS_ALLOWED_METHODS    | List of comma-separated allowed request methods | `GET,POST,PUT,DELETE,PATCH`    | `GET,POST`                    |    ⚫     |
 * | CORS_ALLOWED_HEADERS    | List of comma-separated allowed request headers | `*`                            | `X-Custom-Header`             |    ⚫     |
 * | SWAGGER_ENDPOINT        | Swagger endpoint                                | `/api-docs`                    | `/my-swagger-endpoint`        |    ⚫     |
 * | SWAGGER_CSS_PATH        | Swagger CSS path                                | `/css/swagger.css`             | `http://localhost:5173`       |    ⚫     |
 * | SWAGGER_JS_PATH         | Swagger JS path                                 | `/js/swagger.js`               | `GET,POST`                    |    ⚫     |
 * | SWAGGER_OAUTH2_REDIRECT | Swagger OAuth2 redirect URL                     | `/oauth2-redirect.html`        | `/oauth2-redirect.html`       |    ⚫     |
 */

import path from "path";

import { z } from "@org/lib-commons";
import dotenv from "dotenv";

const Transform = {
  BOOLEAN: value => value.toLowerCase() === "true",
  NUMBER: value => Number(value),
  ARRAY: value => value.split(",").map(s => s.trim()),
  URL: value => (value.startsWith("/") ? value : `/${value}`),
} as const satisfies Record<string, (value: string) => unknown>;

// prettier-ignore
const ENVIRONMENT_VARS = z.object({
  // Express server
  SERVER_DOMAIN: z.string(),
  SERVER_ENV: z.union([z.literal("test"), z.literal("production"), z.literal("development")]),
  SERVER_SESSION_SECRET: z.string(),
  SERVER_ASSETS_URI: z.string().default("assets"),
  SERVER_VERSION: z.string().default("?.?.?"),
  SERVER_NAME: z.string().default("app-node-express"),
  SERVER_PORT: z.string().default("8081").transform(Transform.NUMBER),
  SERVER_IOC_SCAN_DIRS: z.string().default("infrastructure").transform(Transform.ARRAY),

  // mongodb
  DATABASE_URL: z.string(),
  DATABASE_NAME: z.string().default("development"),  

  // keycloak
  KEYCLOAK_URL: z.string(),
  KEYCLOAK_ADMIN_CLI_SECRET: z.string(),
  KEYCLOAK_ADMIN_CLI_ID: z.string().default("admin-cli"),
  KEYCLOAK_REALM: z.string().default("master"),
  KEYCLOAK_AUTHORIZATION_ENDPOINT: z.string().default("/realms/master/protocol/openid-connect/auth").transform(Transform.URL),
  KEYCLOAK_SSL_REQUIRED: z.string().default("none"),
  KEYCLOAK_CONFIDENTIAL_PORT: z.string().default("0"),
  KEYCLOAK_BEARER_ONLY: z.string().default("true").transform(Transform.BOOLEAN),

  // @ts-rest/openapi
  SWAGGER_ENDPOINT: z.string().default("/api-docs").transform(Transform.URL),
  SWAGGER_CSS_PATH: z.string().default("/css/swagger.css").transform(Transform.URL),
  SWAGGER_JS_PATH: z.string().default("/js/swagger.js").transform(Transform.URL),
  SWAGGER_OAUTH2_REDIRECT: z.string().default("/oauth2-redirect.html").transform(Transform.URL),

  // cors
  CORS_ALLOWED_ORIGINS: z.string().default("*").transform(Transform.ARRAY),
  CORS_CREDENTIALS: z.string().default("true").transform(Transform.BOOLEAN),
  CORS_ALLOWED_METHODS: z.string().default("GET,POST,PUT,DELETE,PATCH").transform(Transform.ARRAY),
  CORS_ALLOWED_HEADERS: z.string().default("*").transform(Transform.ARRAY),
});

export const env = parseEnvironmentVars();

export function testMode() {
  return env.SERVER_ENV === "test";
}

function parseEnvironmentVars() {
  configLocalDotenv();
  const typedEnvData = filterEnvBySchema();
  const parsedResults = ENVIRONMENT_VARS.safeParse(typedEnvData);

  if (!parsedResults.success) {
    const currentIssue = parsedResults.error.issues[0];
    const { path, ...rest } = currentIssue;
    const zodPath = path.join(".");
    const errorJson = JSON.stringify(rest, null, 2);
    const errorTitle = `Unable to parse environment variable: ${zodPath}`;
    const errorMessage = `${errorTitle}\n${errorJson}`;
    throw new Error(errorMessage);
  }

  const serverUrl = `${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}`;
  return { ...parsedResults.data, SERVER_URL: serverUrl } as const;
}

function filterEnvBySchema() {
  return Object.keys(ENVIRONMENT_VARS.shape).reduce((acc, key) => {
    const value = process.env[key];
    // @ts-ignore False positive
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});
}

function configLocalDotenv() {
  // Make sure this function only accesses process.env and not local env (it is not initialized yet).
  dotenv.config({
    path: path.join(process.cwd(), `.env.${process.env.SERVER_ENV ?? "development"}.local`),
  });
}
