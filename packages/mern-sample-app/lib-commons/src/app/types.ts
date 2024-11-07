import { z } from "../lib";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;

export type NoArgsClass = new () => TODO;

export function zodAny() {
  return z.any();
}

export function debounce<T extends (...args: TODO[]) => Promise<TODO> | TODO>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let pendingPromises: Array<{
    resolve: (value: ReturnType<T> | PromiseLike<ReturnType<T>>) => void;
    reject: (reason?: TODO) => void;
    args: Parameters<T>;
  }> = [];

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    return new Promise<ReturnType<T>>((resolve, reject) => {
      pendingPromises.push({ resolve, reject, args });

      timeout = setTimeout(async () => {
        const currentPendingPromises = pendingPromises;
        pendingPromises = [];
        timeout = null;

        try {
          const result = await func(...args);
          currentPendingPromises.forEach(({ resolve }) => resolve(result));
        } catch (error) {
          currentPendingPromises.forEach(({ reject }) => reject(error));
        }
      }, wait);
    });
  };
}
