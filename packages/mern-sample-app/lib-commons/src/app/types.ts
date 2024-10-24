import { z } from "../lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export type NoArgsClass = new () => TODO;

export function zodAny() {
  return z.any();
}
