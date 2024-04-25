import z from "zod";

export const MongoSearch = z.object({
  fields: z.array(z.string()).default([]),
  regex: z.string().default("").optional(),
  options: z.string().default("i").optional(),
});

export type MongoSearch = z.infer<typeof MongoSearch>;
