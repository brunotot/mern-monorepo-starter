type ChangeHandlerValue<T, K extends keyof T> = T[K] | ((prev: T[K]) => T[K]);

export type ChangeHandler<T> = <K extends keyof T>(key: K, value: ChangeHandlerValue<T, K>) => void;

export type Optional<T> = T | null | undefined;
