import { MongoClient } from "@internal";
import type { Db, Document as MongoDocument } from "mongodb";

export abstract class MongoRepository<T extends MongoDocument> {
  readonly #db: Db;
  readonly #name: string;

  constructor(name: string) {
    this.#db = MongoClient.getInstance().db();
    this.#name = name;
  }

  protected get collection() {
    return this.#db.collection<T>(this.#name);
  }
}
