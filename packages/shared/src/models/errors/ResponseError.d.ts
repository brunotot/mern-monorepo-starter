import type { ErrorLog } from "./../domain/ErrorLog";
import type { HttpResponseStatus } from "../../types";
export declare class ErrorResponse extends Error {
  #private;
  stack: string | undefined;
  content: Omit<ErrorLog, "_id">;
  constructor(
    originalUrl: string,
    status: HttpResponseStatus,
    details: string,
    metadata?: Record<string, unknown>,
  );
}
//# sourceMappingURL=ResponseError.d.ts.map
