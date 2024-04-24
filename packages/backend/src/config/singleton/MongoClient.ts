import type { MongoClientOptions } from "mongodb";
import { MongoClient as MongoClientNative } from "mongodb";

import { Environment } from "./Environment";

function buildMongoUri(): string {
  // TODO: DB_DATABASE is unnecessary.
  const { DB_HOST, DB_PORT } = Environment.getInstance().vars;
  return `mongodb://${DB_HOST}:${DB_PORT}`;
}

function buildMongoOptions(): MongoClientOptions {
  return {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //loggerLevel: 'debug' // This will log all MongoDB interactions}
  };
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
