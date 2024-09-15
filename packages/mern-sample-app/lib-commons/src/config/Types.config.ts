import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export function zodAny() {
  return z.any();
}

export type NoArgsClass = new () => TODO;

export type Class<T = TODO> = new (...args: TODO[]) => T;
