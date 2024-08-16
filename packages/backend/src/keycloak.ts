import Keycloak, { type KeycloakConfig } from "keycloak-connect";
import { Environment } from "./config/singletons/Environment";

const vars = Environment.getInstance().vars;

const config: KeycloakConfig = {
  realm: vars.KEYCLOAK_REALM,
  resource: vars.KEYCLOAK_ADMIN_CLI_ID,
  "bearer-only": false,
  "auth-server-url": vars.KEYCLOAK_URL,
  "confidential-port": vars.KEYCLOAK_CONFIDENTIAL_PORT,
  "ssl-required": vars.KEYCLOAK_SSL_REQUIRED, // use "all" in production
};

const keycloak = new Keycloak({}, config);

export default keycloak;
