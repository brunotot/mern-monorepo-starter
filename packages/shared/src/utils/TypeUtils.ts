// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;
export type Class<T = TODO> = new (...args: TODO[]) => T;
