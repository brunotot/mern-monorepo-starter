// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;
export type Class<T = TODO> = new (...args: TODO[]) => T;
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}
export const VAR_USER_ROLES = [Role.ADMIN, Role.USER] as const;
