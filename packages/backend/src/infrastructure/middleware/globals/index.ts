import { withAugmentedResponseMiddleware } from "./withAugmentedResponse";
import { withCompressionMiddleware } from "./withCompression";
import { withCookieParserMiddleware } from "./withCookieParser";
import { withCorsMiddleware } from "./withCors";
import { withCredentialsMiddleware } from "./withCredentials";
import { withHelmetMiddleware } from "./withHelmet";
import { withHppMiddleware } from "./withHpp";
import { withJsonParserMiddleware } from "./withJsonParser";
import { withMorganMiddleware } from "./withMorgan";
import { withUrlEncodedMiddleware } from "./withUrlEncoded";

export * from "./withAugmentedResponse";
export * from "./withCompression";
export * from "./withCookieParser";
export * from "./withCors";
export * from "./withCredentials";
export * from "./withHelmet";
export * from "./withHpp";
export * from "./withJsonParser";
export * from "./withMorgan";
export * from "./withUrlEncoded";

export const GLOBAL_MIDDLEWARES = [
  withMorganMiddleware,
  withCredentialsMiddleware,
  withCorsMiddleware,
  withHppMiddleware,
  withHelmetMiddleware,
  withCompressionMiddleware,
  withJsonParserMiddleware,
  withUrlEncodedMiddleware,
  withCookieParserMiddleware,
  withAugmentedResponseMiddleware,
];
