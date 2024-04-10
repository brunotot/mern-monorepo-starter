export const RoleList = ["admin", "user"] as const;

export type Role = (typeof RoleList)[number];

export type User = {
  id: number;
  roles: Role[];
};
