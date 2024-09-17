import { env } from "@org/app-node-express/env";
import { MongoClient, type Db, type ClientSession } from "mongodb";
import { type zod } from "@org/lib-commons";

export class MongoDatabaseService {
  static buildMongoClient(): MongoClient {
    return new MongoClient(env.DATABASE_URL, {});
  }

  private static instance: MongoDatabaseService;

  static getInstance() {
    this.instance ??= new MongoDatabaseService();
    return this.instance;
  }

  testSession: ClientSession;
  #client: MongoClient;
  #db: Db;

  private constructor() {
    // NOOP
  }

  public set client(client: MongoClient) {
    this.#client = client;
  }

  public get client() {
    return this.#client;
  }

  async #sneakyThrows<T>(fn: () => Promise<T>): Promise<T | undefined> {
    try {
      return await fn();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      // NOOP
    }
  }

  async rollbackTransaction(session: ClientSession) {
    if (process.env.SERVER_ENV === "test") return;

    await this.#sneakyThrows(async () => {
      if (!session) return;
      await session.abortTransaction();
      session.endSession();
    });
  }

  async commitTransaction(session: ClientSession) {
    if (process.env.SERVER_ENV === "test") return;

    this.#sneakyThrows(async () => {
      if (!session) return;
      await session.commitTransaction();
      session.endSession();
    });
  }

  async startTransaction(session: ClientSession): Promise<ClientSession> {
    if (process.env.SERVER_ENV === "test") return null as unknown as ClientSession;

    return (await this.#sneakyThrows(async () => {
      if (!session.inTransaction()) session.startTransaction();
      return session;
    }))!;
  }

  get db() {
    if (this.#db) return this.#db;
    this.#db = this.#client.db(env.DATABASE_NAME);
    return this.#db;
  }

  collection<const T extends zod.Schema>(zodSchema: T) {
    const documentName = zodSchema.description;
    if (!documentName) throw new Error("No document name provided.");
    const lowerCaseName = documentName.toLowerCase();
    const suffix = "s";
    const computedSuffix = lowerCaseName.endsWith(suffix) ? "" : suffix;
    const name = lowerCaseName + computedSuffix;
    return this.db.collection<zod.infer<T>>(name, {});
  }
}
