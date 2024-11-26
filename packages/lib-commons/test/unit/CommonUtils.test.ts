import { vi } from "vitest";

import { debounce } from "@/app/CommonUtils";

describe("debounce", () => {
  let mockFunction: ReturnType<typeof vi.fn>;
  const waitTime = 200; // 200ms debounce delay

  beforeEach(() => {
    vi.useFakeTimers(); // Mock timers for precise control
    mockFunction = vi.fn();
  });

  afterEach(() => {
    vi.useRealTimers(); // Restore real timers after each test
  });

  it("should call the debounced function after the specified wait time", async () => {
    const debounced = debounce(mockFunction, waitTime);

    debounced("arg1");
    debounced("arg2");

    expect(mockFunction).not.toHaveBeenCalled();

    vi.advanceTimersByTime(waitTime); // Simulate the passage of time

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("arg2"); // Only the last argument is passed
  });

  it("should resolve with the result of the debounced function", async () => {
    mockFunction.mockResolvedValue("result");
    const debounced = debounce(mockFunction, waitTime);

    const promise = debounced("arg");

    vi.advanceTimersByTime(waitTime); // Simulate the passage of time

    const result = await promise;

    expect(result).toBe("result");
  });

  it("should reject if the debounced function throws an error", async () => {
    mockFunction.mockRejectedValue(new Error("test error"));
    const debounced = debounce(mockFunction, waitTime);

    const promise = debounced("arg");

    vi.advanceTimersByTime(waitTime); // Simulate the passage of time

    await expect(promise).rejects.toThrow("test error");
  });

  it("should batch multiple calls and resolve with the same result", async () => {
    mockFunction.mockResolvedValue("batched result");
    const debounced = debounce(mockFunction, waitTime);

    const promise1 = debounced("arg1");
    const promise2 = debounced("arg2");

    vi.advanceTimersByTime(waitTime); // Simulate the passage of time

    const result1 = await promise1;
    const result2 = await promise2;

    expect(result1).toBe("batched result");
    expect(result2).toBe("batched result");
    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("arg2"); // Last argument is used
  });

  it("should reset the timer on subsequent calls", async () => {
    const debounced = debounce(mockFunction, waitTime);

    debounced("arg1");
    vi.advanceTimersByTime(waitTime / 2); // Halfway through the wait time

    debounced("arg2"); // Reset the timer
    vi.advanceTimersByTime(waitTime / 2);

    expect(mockFunction).not.toHaveBeenCalled(); // Timer reset, no call yet

    vi.advanceTimersByTime(waitTime / 2); // Complete the remaining time

    expect(mockFunction).toHaveBeenCalledTimes(1);
    expect(mockFunction).toHaveBeenCalledWith("arg2");
  });
});
