import Keycloak from "keycloak-js";

export const keycloakClient = new Keycloak({
  realm: "master",
  url: import.meta.env.VITE_API_KEYCLOAK_URL,
  clientId: "app-vite-react",
});

export async function keycloakLogout() {
  await keycloakClient.logout();
}
