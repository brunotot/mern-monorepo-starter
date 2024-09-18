import type { NoArgsClass } from "../../../lib-commons/dist/src";

import { AuthorizationMock } from "./AuthorizationMock";
import { AuthorizationRepositoryMock } from "./AuthorizationRepositoryMock";

export default {
  Authorization: AuthorizationMock,
  AuthorizationRepository: AuthorizationRepositoryMock,
} as const satisfies Record<string, NoArgsClass>;
