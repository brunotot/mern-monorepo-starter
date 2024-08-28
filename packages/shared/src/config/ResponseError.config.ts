import { ErrorResponse } from "../errors";

export function getTypedError(error: unknown): ErrorResponse {
  const message =
    error != null &&
    typeof error === "object" &&
    "message" in error &&
    typeof error["message"] === "string"
      ? error.message
      : "Internal Server Error";

  return error instanceof ErrorResponse ? error : new ErrorResponse(500, message);
}
