import z from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;
export type Class<T = TODO> = new (...args: TODO[]) => T;

export const Role = z.enum(["ADMIN", "USER"]);

export type Role = z.infer<typeof Role>;

export const VAR_USER_ROLES = Role.options;

export const ObjectId = String;

export type ObjectId = string;
