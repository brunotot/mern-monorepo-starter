/**
 * @packageDocumentation Environment setup.
 */

import path from "path";

import { z } from "@org/lib-commons";
import dotenv from "dotenv";

// prettier-ignore
const ENVIRONMENT_VARS = z.object({
  // Express server
  SERVER_DOMAIN: z.string(),
  SERVER_ENV: z.union([z.literal("test"), z.literal("production"), z.literal("development")]),
  SERVER_SESSION_SECRET: z.string(),
  SERVER_ASSETS_URI: z.string().default("assets"),
  SERVER_VERSION: z.string().default("?.?.?"),
  SERVER_NAME: z.string().default("app-node-express"),
  SERVER_PORT: z.string().default("8081").transform(v => Number(v)),
  SERVER_IOC_SCAN_DIRS: z.string().default("infrastructure").transform(v => v.split(",").map(s => s.trim())),

  // mongodb
  DATABASE_URL: z.string(),
  DATABASE_NAME: z.string().default("development"),  

  // keycloak
  KEYCLOAK_URL: z.string(),
  KEYCLOAK_ADMIN_CLI_SECRET: z.string(),
  KEYCLOAK_ADMIN_CLI_ID: z.string().default("admin-cli"),
  KEYCLOAK_REALM: z.string().default("master"),
  KEYCLOAK_AUTHORIZATION_ENDPOINT: z.string().default("/realms/master/protocol/openid-connect/auth"),
  KEYCLOAK_SSL_REQUIRED: z.string().default("none"),
  KEYCLOAK_CONFIDENTIAL_PORT: z.string().default("0"),
  KEYCLOAK_BEARER_ONLY: z.string().default("true").transform(v => v === "true"),

  // @ts-rest
  TS_REST_SWAGGER_ENDPOINT: z.string().default("/api-docs").transform(s => (s.startsWith("/") ? s : `/${s}`)),
  TS_REST_SWAGGER_CSS_PATH: z.string().default("/css/swagger.css"),
  TS_REST_SWAGGER_JS_PATH: z.string().default("/js/swagger.js"),
  TS_REST_SWAGGER_OAUTH2_REDIRECT_ENDPOINT: z.string().default("/oauth2-redirect.html"),

  // cors
  CORS_ALLOWED_ORIGINS: z.string().transform(s => s.split(",")),
  CORS_CREDENTIALS: z.string().default("true").transform(s => s === "true"),
  CORS_ALLOWED_METHODS: z.string().default("GET,POST,PUT,DELETE,PATCH").transform(s => s.split(",")),
  CORS_ALLOWED_HEADERS: z.string().default("*").transform(s => s.split(",").map(chunk => chunk.trim())),
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
