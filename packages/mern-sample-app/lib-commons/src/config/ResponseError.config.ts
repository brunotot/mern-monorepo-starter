import { ErrorResponse } from "../errors";

export const UNHANDLED_SERVER_ERROR_MSG = "Unhandled Server Error";

export function getTypedError(error: unknown): ErrorResponse {
  const message =
    error != null &&
    typeof error === "object" &&
    "message" in error &&
    typeof error["message"] === "string"
      ? error.message
      : UNHANDLED_SERVER_ERROR_MSG;

  return error instanceof ErrorResponse ? error : new ErrorResponse(500, message);
}
