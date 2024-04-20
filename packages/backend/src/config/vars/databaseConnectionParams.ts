import { TODO } from "@org/shared";
import { ConnectOptions, Document, connect, set } from "mongoose";
import { $BackendAppConfig } from "../BackendAppConfig";

export type InferMongoId<T> = "_id" extends keyof T ? T["_id"] : TODO;

export type Entity<T> = Document<InferMongoId<T>, TODO, T> & T;

export type DatabaseConnectionParams = {
  dbHost: string;
  dbPort: string;
  dbName: string;
} & Omit<ConnectOptions, "dbName">;

export const VAR_DATABASE_CONNECTION_PARAMS: DatabaseConnectionParams = {
  dbHost: $BackendAppConfig.env.DB_HOST,
  dbPort: $BackendAppConfig.env.DB_PORT,
  dbName: $BackendAppConfig.env.DB_DATABASE,
};

export async function mongoConnect() {
  const { dbHost, dbPort, dbName, ...restOptions } = $BackendAppConfig.databaseConnectionParams;
  const mongoUri = `mongodb://${dbHost}:${dbPort}`;
  if ($BackendAppConfig.env.NODE_ENV !== "production") set("debug", true);
  await connect(mongoUri, {
    dbName,
    ...restOptions,
  });
}

$BackendAppConfig.databaseConnectionParams = VAR_DATABASE_CONNECTION_PARAMS;
