import { HttpStatusNumeric } from "../../config";

declare module "express" {
  export interface Response {
    sendError: (httpStatus: HttpStatusNumeric, details?: string) => never;
  }
}
