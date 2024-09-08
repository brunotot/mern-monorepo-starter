/**
 * @packageDocumentation Environment setup.
 */

import dotenv from "dotenv";
import path from "path";
import z from "zod";
import type { TODO } from "@org/lib-commons";

initDotenv();

const ENVIRONMENT_VARS = z.object({
  PACKAGE_JSON_VERSION: z.string().default("?.?.?"),
  NODE_ENV: z.string().default("development"),
  SWAGGER_ENDPOINT: z
    .string()
    .default("/api-docs")
    .transform(s => (s.startsWith("/") ? s : `/${s}`)),
  APP_NAME: z.string().default("app-node-express"),
  PORT: z.string().default("8081"),
  ORIGIN: z.string().default("*"),
  CREDENTIALS: z
    .string()
    .default("true")
    .transform(s => s === "true"),
  MONGO_URL: z.string(),
  MONGO_DATABASE: z.string(),
  KEYCLOAK_URL: z.string().optional(),
  KEYCLOAK_SSL_REQUIRED: z.string().optional(),
  KEYCLOAK_REALM: z.string().optional(),
  KEYCLOAK_ADMIN_CLI_ID: z.string().optional(),
  KEYCLOAK_ADMIN_CLI_SECRET: z.string().optional(),
  KEYCLOAK_CONFIDENTIAL_PORT: z.string().optional(),
  ALLOWED_ORIGINS: z
    .string()
    .default("http://localhost:5173")
    .transform(s => s.split(",")),
  SWAGGER_CSS_PATH: z.string().default("/css/swagger.css"),
  SWAGGER_JS_PATH: z.string().default("/js/swagger.js"),
  SWAGGER_OAUTH2_REDIRECT_ENDPOINT: z.string().default("/oauth2-redirect.html"),
  KEYCLOAK_AUTHORIZATION_ENDPOINT: z
    .string()
    .default("/realms/master/protocol/openid-connect/auth"),
});

export const env = parseEnvironmentVars();

function initDotenv() {
  dotenv.config({
    path: path.join(process.cwd(), `.env.${process.env.NODE_ENV ?? "development"}.local`),
  });
}

function parseEnvironmentVars() {
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
  const serverUrl: string =
    process.env.NODE_ENV === "development"
      ? `http://localhost:${process.env.PORT}`
      : `https://${process.env.RAILWAY_PUBLIC_DOMAIN}:${process.env.PORT}`;

  return { ...parsedResults.data, SERVER_URL: serverUrl } as const;
}

function filterEnvBySchema() {
  return Object.keys(ENVIRONMENT_VARS.shape).reduce((acc, key) => {
    const value = process.env[key];
    if (value !== undefined) (acc as TODO)[key] = value;
    return acc;
  }, {});
}
