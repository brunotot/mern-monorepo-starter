import { ErrorResponse, type TODO } from "@org/shared";

export function getTypedError(error: unknown): ErrorResponse {
  //
  return error instanceof ErrorResponse
    ? error
    : new ErrorResponse("", 500, (error as TODO).message);
}
