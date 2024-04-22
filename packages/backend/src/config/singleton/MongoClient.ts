import type { MongoClientOptions } from "mongodb";
import { MongoClient as MongoClientNative } from "mongodb";

import { Environment } from "./Environment";

function buildMongoUri(): string {
  const { DB_HOST, DB_PORT, DB_DATABASE } = Environment.getInstance().vars;
  return `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
}

function buildMongoOptions(): MongoClientOptions {
  return {};
}

export class MongoClient extends MongoClientNative {
  private static instance: MongoClient;

  public static getInstance(): MongoClient {
    MongoClient.instance ??= new MongoClient();
    return MongoClient.instance;
  }

  private constructor() {
    super(buildMongoUri(), buildMongoOptions());
  }
}
