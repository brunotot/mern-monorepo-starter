import z from "zod";
export type TODO = any;
export type Class<T = TODO> = new (...args: TODO[]) => T;
export declare const Role: z.ZodEnum<["ADMIN", "USER"]>;
export type Role = z.infer<typeof Role>;
export declare const VAR_USER_ROLES: ["ADMIN", "USER"];
export declare const ObjectId: StringConstructor;
export type ObjectId = string;
//# sourceMappingURL=TypeUtils.d.ts.map
