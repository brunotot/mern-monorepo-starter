/**
 * @packageDocumentation Environment setup.
 */

import { z } from "@org/lib-commons";
import dotenv from "dotenv";
import path from "path";

// prettier-ignore
const ENVIRONMENT_VARS = z.object({
  // Express server
  SERVER_DOMAIN: z.string(),
  SERVER_SESSION_SECRET: z.string(),
  SERVER_VERSION: z.string().default("?.?.?"),
  SERVER_ENV: z.string(),
  SERVER_NAME: z.string().default("app-node-express"),
  SERVER_PORT: z.string().default("8081").transform(v => Number(v)),

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
  CORS_ALLOWED_HEADERS: z.string().default("*").transform(s => s.split(",")),
});

export const env = parseEnvironmentVars();

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
    // @ts-ignore
    if (value !== undefined) acc[key] = value;
    return acc;
  }, {});
}

function configLocalDotenv() {
  dotenv.config({
    path: path.join(process.cwd(), `.env.${process.env.SERVER_ENV ?? "development"}.local`),
  });
}
