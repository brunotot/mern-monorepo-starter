import { getDirname } from "cross-dirname";
import dotenv from "dotenv";
import path from "path";
import z from "zod";
import type { TODO } from "@org/shared";

export class Environment {
  private static instance: Environment;

  static getInstance(): Environment {
    Environment.instance ??= new Environment();
    return Environment.instance;
  }

  readonly vars: z.infer<typeof this.schema>;

  readonly schema = z.object({
    PACKAGE_JSON_VERSION: z.string().default("?.?.?"),
    NODE_ENV: z.string().default("development"),
    PORT: z.string().default("8080"),
    LOG_FORMAT: z.string().default("dev"),
    LOG_DIR: z.string().default("../../logs"),
    ORIGIN: z.string().default("*"),
    CREDENTIALS: z.string().default("true"),
    MONGO_URL: z.string(),
    MONGO_DATABASE: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
  });

  private constructor() {
    this.#initDotenv();
    this.vars = this.#parseEnvSchema(this.schema);
  }

  #parseEnvSchema<const T extends z.ZodObject<TODO>>(envSchema: T): z.infer<typeof envSchema> {
    const typedEnvData = this.#filterEnvBySchema(envSchema);
    const parsedResults = envSchema.safeParse(typedEnvData);
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

  #filterEnvBySchema<T extends z.AnyZodObject>(schema: T): Partial<z.infer<T>> {
    return Object.keys(schema.shape).reduce((acc, key) => {
      const value = process.env[key];
      if (value !== undefined) (acc as TODO)[key] = value;
      return acc;
    }, {});
  }

  #initDotenv() {
    dotenv.config({
      path: path.join(
        getDirname(),
        "../../../",
        `.env.${process.env.NODE_ENV ?? "development"}.local`,
      ),
    });
  }
}
