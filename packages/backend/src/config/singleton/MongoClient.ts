import { type MongoClientOptions, MongoClient as MongoClientNative } from "mongodb";
import { Environment } from "@org/backend/config/singleton/Environment";

function buildMongoUri(): string {
  const { DB_HOST, DB_PORT } = Environment.getInstance().vars;
  return `mongodb://${DB_HOST}:${DB_PORT}`;
}

function buildMongoOptions(): MongoClientOptions {
  return {} as MongoClientOptions;
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
