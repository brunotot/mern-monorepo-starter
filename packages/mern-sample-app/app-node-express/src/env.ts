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
 *
 * ### Imports
 *
 * ```ts
 * import { env } from "@org/app-node-express/env";
 * import { testMode } from "@org/app-node-express/env";
 * ```
 * ### Examples
 *
 * ```ts
 * // Access the validated environment variables
 * console.log(env.SERVER_PORT);
 * console.log(env.DATABASE_URL);
 *
 * // For test environments, you can check with
 * if (testMode()) {
 *   console.log("Running in test mode");
 * }
 * ```
 *
 * ### Environment variables list
 *
 * #### Mandatory variables
 *
 * | Name                       | Description                                       | Example value                         | Mandatory |
 * |----------------------------|---------------------------------------------------|---------------------------------------|-----------|
 * | SERVER_DOMAIN              | Server domain URI                                 | `http://localhost`                    |    ✅     |
 * | SERVER_ENV                 | Name of the environment (prod, test, dev, etc.)   | `production`, `test` or `development` |    ✅     |
 * | SERVER_SESSION_SECRET      | A secret key for accessing session storage        | `myCustomSecretKey`                   |    ✅     |
 * | KEYCLOAK_URL               | URL to live Keycloak instance                     | `http://my-keycloak-instance.app`     |    ✅     |
 * | KEYCLOAK_ADMIN_CLI_SECRET  | Keycloak secret for `admin-cli` client            | `keycloakAdminCliCustomSecretKey`     |    ✅     |
 * | DATABASE_URL               | Database connection string (MongoDB)              | `mongodb://USER:PASS@DOMAIN:PORT`     |    ✅     |
 *
 * #### Optional variables
 *
 * | Name                       | Description                                       | Default value               | Example value                         | Mandatory |
 * |----------------------------|---------------------------------------------------|-----------------------------|---------------------------------------|-----------|
 * | SERVER_TIMEOUT_IN_MINS     | Timeout duration in minutes for incoming requests | `4`                         | `4`                              |    ⚫     |
 * | SERVER_ASSETS_URI          | URI path to Express server's static assets        | `assets`                    | `assets`                              |    ⚫     |
 * | SERVER_VERSION             | Server version (controlled in package.json)       | `?.?.?`                     | `0.0.1`                               |    ⚫     |
 * | SERVER_NAME                | Custom server name displayed on the initial load  | `app-node-express`          | `my-node-express-app`                 |    ⚫     |
 * | SERVER_PORT                | Port on which the server should be listening      | `8081`                      | `1337`                                |    ⚫     |
 * | SERVER_IOC_SCAN_DIRS       | Directory names for IoC scan (relative to /src)   | `infrastructure`            | `infrastructure,lib`                  |    ⚫     |
 * | KEYCLOAK_ADMIN_CLI_ID      | Name of admin-privileged Keycloak client          | `admin-cli`                 | `admin-cli`                           |    ⚫     |
 * | KEYCLOAK_REALM             | Keycloak realm name                               | `master`                    | `master`                              |    ⚫     |
 * | KEYCLOAK_SSL_REQUIRED      | Keycloak SSL required (use 'all' for prod)        | `none`                      | `all`                                 |    ⚫     |
 * | KEYCLOAK_CONFIDENTIAL_PORT | Keycloak confidential port (non-zero for prod)    | `0`                         | `1`                                   |    ⚫     |
 * | KEYCLOAK_BEARER_ONLY       | Only use Keycloak via JWT authorization           | `true`                      | `true`                                |    ⚫     |
 * | DATABASE_NAME              | Database name                                     | `development`               | `production`, `test` or `development` |    ⚫     |
 * | CORS_CREDENTIALS           | Use CORS credentials                              | `true`                      | `true`                                |    ⚫     |
 * | CORS_ALLOWED_ORIGINS       | List of comma-separated allowed origin patterns   | `*`                         | `http://localhost:5173`               |    ⚫     |
 * | CORS_ALLOWED_METHODS       | List of comma-separated allowed request methods   | `GET,POST,PUT,DELETE,PATCH` | `GET,POST`                            |    ⚫     |
 * | CORS_ALLOWED_HEADERS       | List of comma-separated allowed request headers   | `*`                         | `X-Custom-Header`                     |    ⚫     |
 * | SWAGGER_ENDPOINT           | Swagger endpoint                                  | `/api-docs`                 | `/my-swagger-endpoint`                |    ⚫     |
 * | SWAGGER_CSS_PATH           | Swagger CSS path                                  | `/css/swagger.css`          | `http://localhost:5173`               |    ⚫     |
 * | SWAGGER_JS_PATH            | Swagger JS path                                   | `/js/swagger.js`            | `GET,POST`                            |    ⚫     |
 * | SWAGGER_OAUTH2_REDIRECT    | Swagger OAuth2 redirect URL                       | `/oauth2-redirect.html`     | `/oauth2-redirect.html`               |    ⚫     |
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
  /**
   * Timeout duration in minutes for incoming requests.
   * Used to set both the request timeout and the connection timeout.
   * @default 4
   */
  SERVER_TIMEOUT_IN_MINS: z.string().default("4").transform(Transform.NUMBER),

  /**
   * The domain name for the server.
   */
  SERVER_DOMAIN: z.string(),

  /**
   * The environment in which the server is running.
   * Allowed values: "test", "production", "development".
   */
  SERVER_ENV: z.union([z.literal("test"), z.literal("production"), z.literal("development")]),

  /**
   * Secret key used to sign the session cookies.
   */
  SERVER_SESSION_SECRET: z.string(),

  /**
   * The URI path for serving static assets.
   * @default "assets"
   */
  SERVER_ASSETS_URI: z.string().default("assets"),

  /**
   * The current version of the server.
   * @default "?.?.?"
   */
  SERVER_VERSION: z.string().default("?.?.?"),

  /**
   * The name of the server.
   * @default "app-node-express"
   */
  SERVER_NAME: z.string().default("app-node-express"),

  /**
   * The port on which the server listens.
   * @default 8081
   */
  SERVER_PORT: z.string().default("8081").transform(Transform.NUMBER),

  /**
   * Directory paths to be scanned for IoC (Inversion of Control).
   * @default "infrastructure"
   */
  SERVER_IOC_SCAN_DIRS: z.string().default("infrastructure").transform(Transform.ARRAY),

  /**
   * The URL of the database server.
   */
  DATABASE_URL: z.string(),

  /**
   * The name of the database to use.
   * @default "development"
   */
  DATABASE_NAME: z.string().default("development"),  

  /**
   * The URL of the Keycloak server.
   */
  KEYCLOAK_URL: z.string(),

  /**
   * The client secret for the Keycloak admin CLI.
   */
  KEYCLOAK_ADMIN_CLI_SECRET: z.string(),

  /**
   * The client ID for the Keycloak admin CLI.
   * @default "admin-cli"
   */
  KEYCLOAK_ADMIN_CLI_ID: z.string().default("admin-cli"),

  /**
   * The Keycloak realm to use.
   * @default "master"
   */
  KEYCLOAK_REALM: z.string().default("master"),

  /**
   * SSL requirements for Keycloak.
   * @default "none"
   */
  KEYCLOAK_SSL_REQUIRED: z.string().default("none"),

  /**
   * Confidential port for Keycloak.
   * @default 0
   */
  KEYCLOAK_CONFIDENTIAL_PORT: z.string().default("0"),

  /**
   * Indicates if the Keycloak client is bearer-only.
   * @default true
   */
  KEYCLOAK_BEARER_ONLY: z.string().default("true").transform(Transform.BOOLEAN),

  /**
   * The endpoint URL for Swagger documentation.
   * @default "/api-docs"
   */
  SWAGGER_ENDPOINT: z.string().default("/api-docs").transform(Transform.URL),

  /**
   * The path to the Swagger CSS file.
   * @default "/css/swagger.css"
   */
  SWAGGER_CSS_PATH: z.string().default("/css/swagger.css").transform(Transform.URL),

  /**
   * The path to the Swagger JavaScript file.
   * @default "/js/swagger.js"
   */
  SWAGGER_JS_PATH: z.string().default("/js/swagger.js").transform(Transform.URL),

  /**
   * The URL to redirect to for OAuth2 authentication with Swagger.
   * @default "/oauth2-redirect.html"
   */
  SWAGGER_OAUTH2_REDIRECT: z.string().default("/oauth2-redirect.html").transform(Transform.URL),

  /**
   * Allowed origins for CORS requests.
   * @default "*"
   */
  CORS_ALLOWED_ORIGINS: z.string().default("*").transform(Transform.ARRAY),

  /**
   * Indicates if credentials are allowed in CORS requests.
   * @default true
   */
  CORS_CREDENTIALS: z.string().default("true").transform(Transform.BOOLEAN),

  /**
   * HTTP methods allowed in CORS requests.
   * @default "GET,POST,PUT,DELETE,PATCH"
   */
  CORS_ALLOWED_METHODS: z.string().default("GET,POST,PUT,DELETE,PATCH").transform(Transform.ARRAY),

  /**
   * Headers allowed in CORS requests.
   * @default "*"
   */
  CORS_ALLOWED_HEADERS: z.string().default("*").transform(Transform.ARRAY),
});

export const env = parseEnvironmentVars();

/**
 * Checks if the current server environment is set to "test".
 * @returns `true` if the server environment is "test", otherwise `false`.
 */
export function testMode() {
  return env.SERVER_ENV === "test";
}

function parseEnvironmentVars() {
  configLocalDotenv();
  const typedEnvData = filterEnvBySchema();
  const parsedResults = ENVIRONMENT_VARS.safeParse(typedEnvData);

  if (!parsedResults.success) {
    let error = `Environment variables validation failed\n`;
    for (const issue of parsedResults.error.issues) {
      const path = issue.path.join(".");
      const message = issue.message;
      const code = issue.code;
      error += `    ❌ ${path}: ${message} (${code})\n`;
    }
    throw new Error(error);
  }

  return {
    ...parsedResults.data,
    SERVER_URL: `${process.env.SERVER_DOMAIN!}:${process.env.SERVER_PORT!}`,
  } as const;
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
