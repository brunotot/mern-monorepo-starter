import z from "zod";
export declare const ErrorLog: z.ZodObject<
  {
    _id: z.ZodType<String, z.ZodTypeDef, String>;
    details: z.ZodString;
    status: z.ZodNumber;
    message: z.ZodString;
    path: z.ZodString;
    timestamp: z.ZodString;
    metadata: z.ZodRecord<z.ZodString, z.ZodAny>;
  },
  "strip",
  z.ZodTypeAny,
  {
    path: string;
    message: string;
    status: number;
    _id: String;
    details: string;
    timestamp: string;
    metadata: Record<string, any>;
  },
  {
    path: string;
    message: string;
    status: number;
    _id: String;
    details: string;
    timestamp: string;
    metadata: Record<string, any>;
  }
>;
export type ErrorLog = z.infer<typeof ErrorLog>;
//# sourceMappingURL=ErrorLog.d.ts.map
