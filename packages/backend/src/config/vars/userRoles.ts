export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export const VAR_USER_ROLES = [Role.ADMIN, Role.USER] as const;
