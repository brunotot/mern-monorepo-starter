import z from "zod";

export const MongoSort = z.array(z.tuple([z.string(), z.enum(["asc", "desc"])]));

export type MongoSort = z.infer<typeof MongoSort>;
