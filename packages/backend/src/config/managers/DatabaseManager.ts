import { Environment } from "@org/backend/config/singletons/Environment";
import type { MongoClient, Db, ClientSession } from "mongodb";
import { type ZodSchema, type z } from "zod";
import server from "@org/backend/server";

export class DatabaseManager {
  private static instance: DatabaseManager;

  static getInstance() {
    this.instance ??= new DatabaseManager();
    return this.instance;
  }

  #client: MongoClient;
  #db: Db;

  session: ClientSession | undefined;

  private constructor() {
    this.#client = server.mongoClient;
  }

  private get client() {
    return this.#client;
  }

  async rollbackTransaction() {
    if (this.session) {
      await this.session.abortTransaction();
      this.session.endSession();
    }
    this.session = undefined;
  }

  async commitTransaction() {
    if (this.session) {
      await this.session.commitTransaction();
      this.session.endSession();
    }
    this.session = undefined;
  }

  startTransaction() {
    this.session = this.client.startSession();
    this.session.startTransaction();
  }

  get db() {
    if (this.#db) return this.#db;
    this.#db = this.#client.db(Environment.getInstance().vars.MONGO_DATABASE);
    return this.#db;
  }

  // Show deleted in table checkbox

  collection<const T extends ZodSchema>(zodSchema: T) {
    const documentName = zodSchema.description;
    if (!documentName) throw new Error("No document name provided.");
    const lowerCaseName = documentName.toLowerCase();
    const suffix = "s";
    const computedSuffix = lowerCaseName.endsWith(suffix) ? "" : suffix;
    const name = lowerCaseName + computedSuffix;
    return this.db.collection<z.infer<T>>(name);
  }
}
