/// <reference types="@types/jest" />

import { getTypedError, UNHANDLED_SERVER_ERROR_MSG } from "../src/config/ResponseError.config";
import { ErrorResponse } from "../src/errors/ResponseError";

describe("getTypedError", () => {
  describe("given the error is handled by system", () => {
    it("should return ErrorResponse with status corresponding to one defined by system", () => {
      const o1Message = "Not found!";
      const o1Status = 404;
      const o1 = getTypedError(new ErrorResponse(o1Status, o1Message));
      expect(o1).toBeInstanceOf(ErrorResponse);
      expect(o1.content.status).toBe(o1Status);
      expect(o1.content.message).toBe(o1Message);
    });
  });
  describe("given the error is not handled by system", () => {
    it("should return ErrorResponse with status 500 and appropriate system message", () => {
      const o1 = getTypedError(undefined);
      expect(o1).toBeInstanceOf(ErrorResponse);
      expect(o1.content.status).toBe(500);
      expect(o1.content.message).toBe(UNHANDLED_SERVER_ERROR_MSG);
    });
  });
});
