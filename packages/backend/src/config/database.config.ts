import { ConnectOptions, Document, connect, set } from "mongoose";
import { getVar } from "./../config/vars.config";

export type InferMongoId<T> = "_id" extends keyof T ? T["_id"] : any;

export type Entity<T> = Document<InferMongoId<T>, {}, T>;

export const databaseConnect = async () => {
  const dbConfig = {
    url: `mongodb://${getVar("DB_HOST")}:${getVar("DB_PORT")}`,
    options: {
      dbName: getVar("DB_DATABASE"),
    } satisfies ConnectOptions,
  };

  if (getVar("NODE_ENV") !== "production") {
    set("debug", true);
  }

  await connect(dbConfig.url, dbConfig.options);
};
