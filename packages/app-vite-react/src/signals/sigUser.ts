import { type User } from "@org/lib-commons";
import { signal } from "@preact/signals-react";

export const sigUser = signal<User | null>(null);
