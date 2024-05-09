import z from "zod";
export declare const User: z.ZodObject<
  {
    _id: z.ZodType<String, z.ZodTypeDef, String>;
    username: z.ZodString;
    password: z.ZodString;
    email: z.ZodString;
    roles: z.ZodArray<z.ZodEnum<["ADMIN", "USER"]>, "many">;
    refreshToken: z.ZodArray<z.ZodString, "many">;
  },
  "strip",
  z.ZodTypeAny,
  {
    _id: String;
    username: string;
    password: string;
    email: string;
    roles: ("ADMIN" | "USER")[];
    refreshToken: string[];
  },
  {
    _id: String;
    username: string;
    password: string;
    email: string;
    roles: ("ADMIN" | "USER")[];
    refreshToken: string[];
  }
>;
export type User = z.infer<typeof User>;
//# sourceMappingURL=User.d.ts.map
