import { type NoArgsClass } from "../../../shared/dist/src/index";
import { KeycloakAuthorizationMock } from "./KeycloakAuthorizationMock";
import { KeycloakRepositoryMock } from "./KeycloakRepositoryMock";

export default {
  Authorization: KeycloakAuthorizationMock,
  AuthorizationRepository: KeycloakRepositoryMock,
} as const satisfies Record<string, NoArgsClass>;
