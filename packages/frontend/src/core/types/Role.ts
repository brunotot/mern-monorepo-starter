export const Roles = ["admin", "user"] as const;

export type Role = (typeof Roles)[number];
