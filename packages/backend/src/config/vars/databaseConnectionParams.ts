import type { TODO } from "@org/shared";
import type { ConnectOptions, Document } from "mongoose";
import { connect, set } from "mongoose";

import { VAR_ZOD_ENVIRONMENT } from "@internal";

export type InferMongoId<T> = "_id" extends keyof T ? T["_id"] : TODO;

export type Entity<T> = Document<InferMongoId<T>, TODO, T> & T;

export type DatabaseConnectionParams = {
  dbHost: string;
  dbPort: string;
  dbName: string;
} & Omit<ConnectOptions, "dbName">;

const VAR_DATABASE_CONNECTION_PARAMS: DatabaseConnectionParams = {
  dbHost: VAR_ZOD_ENVIRONMENT.DB_HOST,
  dbPort: VAR_ZOD_ENVIRONMENT.DB_PORT,
  dbName: VAR_ZOD_ENVIRONMENT.DB_DATABASE,
};

export async function mongoConnect() {
  const { dbHost, dbPort, dbName, ...restOptions } = VAR_DATABASE_CONNECTION_PARAMS;
  const mongoUri = `mongodb://${dbHost}:${dbPort}`;
  if (VAR_ZOD_ENVIRONMENT.NODE_ENV !== "production") set("debug", true);
  await connect(mongoUri, {
    dbName,
    ...restOptions,
  });
}
