import Keycloak from "keycloak-js";

export const keycloakClient = new Keycloak({
  realm: "master",
  url: "http://localhost:8080/",
  clientId: "app-vite-react",
});
