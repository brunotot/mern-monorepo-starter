import { type NoArgsClass } from "../../../shared/dist/src/index";
import { KeycloakAuthorizationMock } from "./KeycloakAuthorizationMock";
import { KeycloakRepositoryMock } from "./KeycloakRepositoryMock";

export default {
  KeycloakAuthorization: KeycloakAuthorizationMock,
  KeycloakRepository: KeycloakRepositoryMock,
} as const satisfies Record<string, NoArgsClass>;
