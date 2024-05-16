import { Environment } from "@org/backend/config/singletons/Environment";
import { type Db } from "mongodb";
import { type ZodSchema, type z } from "zod";
import server from "@org/backend/server";

export class DatabaseManager {
  private static instance: DatabaseManager;

  static getInstance() {
    this.instance ??= new DatabaseManager();
    return this.instance;
  }

  #client: Db;

  private constructor() {
    // NOOP
  }

  get client() {
    if (this.#client) return this.#client;
    this.#client = server.mongoClient.db(Environment.getInstance().vars.MONGO_DATABASE);
    return this.#client;
  }

  collection<const T extends ZodSchema>(zodSchema: T) {
    const documentName = zodSchema.description;
    if (!documentName) throw new Error("No document name provided.");
    const lowerCaseName = documentName.toLowerCase();
    const suffix = "s";
    const computedSuffix = lowerCaseName.endsWith(suffix) ? "" : suffix;
    const name = lowerCaseName + computedSuffix;
    return this.client.collection<z.infer<T>>(name);
  }
}
