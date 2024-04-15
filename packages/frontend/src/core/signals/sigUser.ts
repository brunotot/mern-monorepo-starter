import { Role } from "@org/shared";
import { signal } from "@preact/signals-react";

export type User = {
  id: number;
  roles: Role[];
};

export const sigUser = signal<User | null>(null);
