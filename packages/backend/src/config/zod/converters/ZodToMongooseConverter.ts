import { zodSchema } from "@zodyac/zod-mongoose";
import mongoose from "mongoose";
import { z } from "zod";

export function convertZodToMongooseModel<const T extends z.AnyZodObject>(
  name: string,
  zodModel: T,
): mongoose.Model<z.infer<T>> {
  const schemaModel = zodSchema(zodModel);
  const MongoEntity = mongoose.model(name, schemaModel);
  return MongoEntity as mongoose.Model<z.infer<T>>;
}
