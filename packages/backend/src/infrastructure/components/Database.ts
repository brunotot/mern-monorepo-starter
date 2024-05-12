import { Environment } from "@org/backend/config";
import { Injectable } from "@org/backend/decorators";
import { type Db } from "mongodb";
import { type AnyZodObject, type z } from "zod";
import app from "@org/backend/worker";

@Injectable("database")
export class Database {
  #client: Db;

  get client() {
    if (this.#client) return this.#client;
    this.#client = app.mongoClient.db(Environment.getInstance().vars.DB_DATABASE);
    return this.#client;
  }

  collection<T extends AnyZodObject>(zodSchema: T) {
    const documentName = zodSchema.description;
    if (!documentName) throw new Error("No document name provided.");
    const lowerCaseName = documentName.toLowerCase();
    const name = lowerCaseName.endsWith("s") ? lowerCaseName : `${lowerCaseName}s`;
    return this.client.collection<z.infer<T>>(name);
  }
}
