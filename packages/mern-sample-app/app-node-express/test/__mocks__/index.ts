import type { NoArgsClass } from "../../../lib-commons/dist/src";

import { AuthorizationRepositoryMock } from "./AuthorizationRepositoryMock";
import { WithAuthorizationMock } from "./WithAuthorizationMock";
import { WithMorganMock } from "./WithMorganMock";
import { WithRouteContextMock } from "./WithRouteContextMock";
import { WithRouteSecuredMock } from "./WithRouteSecuredMock";

export default {
  withAuthorization: WithAuthorizationMock,
  withMorgan: WithMorganMock,
  withRouteContext: WithRouteContextMock,
  withRouteSecured: WithRouteSecuredMock,
  AuthorizationRepository: AuthorizationRepositoryMock,
} as const satisfies Record<string, NoArgsClass>;
