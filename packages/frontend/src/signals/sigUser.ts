import { User } from "@org/shared";
import { signal } from "@preact/signals-react";

export const sigUser = signal<User | null>(null);
