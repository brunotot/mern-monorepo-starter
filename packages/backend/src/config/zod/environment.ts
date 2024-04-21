import type { TODO } from "@org/shared";
import { getDirname } from "cross-dirname";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
  path: path.join(getDirname(), "../../../", `.env.${process.env.NODE_ENV ?? "development"}.local`),
});

function filterEnvBySchema<T extends z.ZodType<TODO, TODO>>(schema: T): Partial<z.infer<T>> {
  if (schema instanceof z.ZodObject) {
    const schemaKeys = Object.keys(schema.shape) as (keyof z.infer<T>)[];
    return schemaKeys.reduce(
      (acc, key) => {
        const envValue = process.env[key as string];
        if (envValue !== undefined) {
          acc[key] = envValue;
        }
        return acc;
      },
      {} as Partial<z.infer<T>>,
    );
  }
  throw new Error("Provided schema does not have a 'shape' property.");
}

function parseZodEnvironmentSchema<const T extends z.ZodObject<TODO>>(
  environmentSchema: T,
): z.infer<typeof environmentSchema> {
  const typedEnvData = filterEnvBySchema(environmentSchema);
  const parsedResults = environmentSchema.safeParse(typedEnvData);
  if (!parsedResults.success) {
    const currentIssue = parsedResults.error.issues[0];
    const { path, ...rest } = currentIssue;
    const zodPath = path.join(".");
    const errorJson = JSON.stringify(rest, null, 2);
    const errorTitle = `Unable to parse environment variable: ${zodPath}`;
    const errorMessage = `${errorTitle}\n${errorJson}`;
    throw new Error(errorMessage);
  }
  return parsedResults.data;
}

export const VAR_ZOD_ENVIRONMENT = parseZodEnvironmentSchema(
  z.object({
    PACKAGE_JSON_VERSION: z.string().default("?.?.?"),
    NODE_ENV: z.string().default("development"),
    PORT: z.string().default("8080"),
    LOG_FORMAT: z.string().default("dev"),
    LOG_DIR: z.string().default("../../logs"),
    ORIGIN: z.string().default("*"),
    CREDENTIALS: z.string().default("true"),
    DB_HOST: z.string(),
    DB_PORT: z.string(),
    DB_DATABASE: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
  }),
);
