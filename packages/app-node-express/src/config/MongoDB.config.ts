import { type TODO } from "@org/lib-commons";
import { MongoClient } from "mongodb";
import { env } from "@org/app-node-express/setup/env.setup";

export type MongoSort = [string, "asc" | "desc"][];

export type MongoFilters = Record<string, TODO>;

export type MongoSearch = {
  fields: string[];
  regex?: string;
  options?: string;
};

export function buildMongoClient(): MongoClient {
  return new MongoClient(env.MONGO_URL, {});
}
