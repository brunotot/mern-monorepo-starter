import { type TODO } from "@org/lib-commons";
import { type MongoClient as MongoClientInternal } from "mongodb";

export type MongoSort = [string, "asc" | "desc"][];

export type MongoFilters = Record<string, TODO>;

export type MongoSearch = {
  fields: string[];
  regex?: string;
  options?: string;
};

export type MongoClient = MongoClientInternal;
