import { type zod } from "@org/lib-commons";
import { MongoClient, type Db, type ClientSession } from "mongodb";

export class MongoDatabaseService {
  static buildMongoClient(connectionUrl: string, databaseName: string, env: string): MongoClient {
    const service = MongoDatabaseService.getInstance();
    service.connectionUrl = connectionUrl;
    service.databaseName = databaseName;
    service.testMode = env === "test";
    return new MongoClient(connectionUrl);
  }

  private static instance: MongoDatabaseService;

  public connectionUrl: string;
  public databaseName: string;
  public testMode: boolean;

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

  async sneakyThrows<T>(fn: () => Promise<T>): Promise<T | undefined> {
    try {
      return await fn();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      // NOOP
    }
  }

  async rollbackTransaction(session: ClientSession) {
    if (this.testMode) return;
    await this.sneakyThrows(async () => {
      if (!session) return;
      await session.abortTransaction();
      session.endSession();
    });
  }

  async commitTransaction(session: ClientSession) {
    if (this.testMode) return;
    this.sneakyThrows(async () => {
      if (!session) return;
      await session.commitTransaction();
      session.endSession();
    });
  }

  async startTransaction(session: ClientSession): Promise<ClientSession> {
    if (this.testMode) return null as unknown as ClientSession;
    return (await this.sneakyThrows(async () => {
      if (!session.inTransaction()) session.startTransaction();
      return session;
    }))!;
  }

  get db() {
    if (this.#db) return this.#db;
    this.#db = this.#client.db(this.databaseName);
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
