import { zod } from "../lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export function zodAny() {
  return zod().any();
}

export type NoArgsClass = new () => TODO;

export type Class<T = TODO> = new (...args: TODO[]) => T;
