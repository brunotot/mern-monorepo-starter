import { env } from "@org/app-node-express/setup/env.setup";
import { type MongoClient, type Db, type ClientSession } from "mongodb";
import { type ZodSchema, type z } from "zod";
import { server } from "@org/app-node-express/setup/server.setup";

export class DatabaseManager {
  private static instance: DatabaseManager;

  static getInstance() {
    this.instance ??= new DatabaseManager();
    return this.instance;
  }

  testSession: ClientSession;
  #client: MongoClient;
  #db: Db;

  private constructor() {
    this.#client = server.mongoClient;
  }

  public get client() {
    return this.#client;
  }

  async #sneakyThrows<T>(fn: () => Promise<T>): Promise<T | undefined> {
    try {
      return await fn();
    } catch (error) {
      // NOOP
    }
  }

  async rollbackTransaction(session: ClientSession) {
    if (process.env.NODE_ENV === "test") return;

    await this.#sneakyThrows(async () => {
      if (!session) return;
      await session.abortTransaction();
      session.endSession();
    });
  }

  async commitTransaction(session: ClientSession) {
    if (process.env.NODE_ENV === "test") return;

    this.#sneakyThrows(async () => {
      if (!session) return;
      await session.commitTransaction();
      session.endSession();
    });
  }

  async startTransaction(session: ClientSession): Promise<ClientSession> {
    if (process.env.NODE_ENV === "test") return null as unknown as ClientSession;

    return (await this.#sneakyThrows(async () => {
      if (!session.inTransaction()) session.startTransaction();
      return session;
    }))!;
  }

  get db() {
    if (this.#db) return this.#db;
    this.#db = this.#client.db(env.MONGO_DATABASE);
    return this.#db;
  }

  collection<const T extends ZodSchema>(zodSchema: T) {
    const documentName = zodSchema.description;
    if (!documentName) throw new Error("No document name provided.");
    const lowerCaseName = documentName.toLowerCase();
    const suffix = "s";
    const computedSuffix = lowerCaseName.endsWith(suffix) ? "" : suffix;
    const name = lowerCaseName + computedSuffix;
    return this.db.collection<z.infer<T>>(name, {});
  }
}
