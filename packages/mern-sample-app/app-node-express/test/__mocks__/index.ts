import { type NoArgsClass } from "../../../lib-commons/src/config";
import { KeycloakAuthorizationMock } from "./KeycloakAuthorizationMock";
import { KeycloakRepositoryMock } from "./KeycloakRepositoryMock";

export default {
  Authorization: KeycloakAuthorizationMock,
  AuthorizationRepository: KeycloakRepositoryMock,
} as const satisfies Record<string, NoArgsClass>;
