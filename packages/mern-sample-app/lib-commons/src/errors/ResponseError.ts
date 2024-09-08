import HttpStatus from "http-status";
import { type ErrorLog } from "../domain/ErrorLog";

// Local types
type Values<T> = T[keyof T];
type FilterNumbers<T> = { [K in keyof T]: T[K] extends number ? T[K] : never };
type Exclude<T, E> = Pick<T, Values<{ [K in keyof T]: [T[K]] extends [E] ? never : K }>>;
type HttpResponseStatusRecord = Exclude<FilterNumbers<typeof HttpStatus>, never>;

/** 100 | 101 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | ... 27 more ... | 511 */
type HttpResponseStatus = Values<HttpResponseStatusRecord>;

export class ErrorResponse extends Error {
  stack: string | undefined;
  content: Omit<ErrorLog, "_id">;

  constructor(status: HttpResponseStatus, message: string) {
    super(HttpStatus[`${status}_MESSAGE`]);
    this.stack = new Error().stack;
    this.content = this.#buildErrorLog(status, message);
  }

  #buildErrorLog(status: HttpResponseStatus, message: string): Omit<ErrorLog, "_id"> {
    const timestamp = new Date().toISOString();
    return { status, message, timestamp };
  }
}
