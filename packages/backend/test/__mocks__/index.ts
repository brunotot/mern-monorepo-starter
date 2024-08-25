import { type NoArgsClass } from "../../dist/modules";
import { KeycloakAuthMock } from "./KeycloakAuthMock";
import { KeycloakRepositoryMock } from "./KeycloakRepositoryMock";

export default {
  KeycloakAuth: KeycloakAuthMock,
  KeycloakRepository: KeycloakRepositoryMock,
} as const satisfies startListening<string, NoArgsClass>;
