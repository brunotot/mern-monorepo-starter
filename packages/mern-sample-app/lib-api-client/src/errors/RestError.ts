export const UNHANDLED_SERVER_ERROR_MSG = "Unhandled Server Error";

export function getTypedError(error: unknown): RestError {
  const message =
    error != null &&
    typeof error === "object" &&
    "message" in error &&
    typeof error["message"] === "string"
      ? error.message
      : UNHANDLED_SERVER_ERROR_MSG;

  return error instanceof RestError ? error : new RestError(500, message);
}

type RestErrorContent = {
  status: number;
  message: string;
  timestamp: string;
};

export class RestError extends Error {
  stack: string | undefined;
  content: RestErrorContent;

  constructor(status: number, message: string) {
    super(message);
    this.stack = new Error().stack;
    this.content = this.#buildRestErrorContent(status, message);
  }

  #buildRestErrorContent(status: number, message: string): RestErrorContent {
    const timestamp = new Date().toISOString();
    return { status, message, timestamp };
  }
}
