import type HttpStatus from "http-status";

// Local types
type Values<T> = T[keyof T];
type FilterNumbers<T> = { [K in keyof T]: T[K] extends number ? T[K] : never };
type Exclude<T, E> = Pick<T, Values<{ [K in keyof T]: [T[K]] extends [E] ? never : K }>>;
type HttpResponseStatusRecord = Exclude<FilterNumbers<typeof HttpStatus>, never>;

/** 100 | 101 | 200 | 201 | 202 | 203 | 204 | 205 | 206 | 207 | 208 | 226 | 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308 | 400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | ... 27 more ... | 511 */
export type HttpResponseStatus = Values<HttpResponseStatusRecord>;
