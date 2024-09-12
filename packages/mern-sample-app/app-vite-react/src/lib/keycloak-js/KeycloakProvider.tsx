import { StrictMode, type PropsWithChildren } from "react";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { sigUser } from "@org/app-vite-react/signals/sigUser";
import { type KeycloakUser } from "@org/app-vite-react/lib/keycloak-js/KeycloakUser";
import { keycloakClient } from "@org/app-vite-react/lib/keycloak-js/KeycloakClient";
import { jwtDecode } from "jwt-decode";
import { type KeycloakTokenParsed } from "keycloak-js";

const KeycloakImpl = ({ children }: PropsWithChildren) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <div>Not authenticated</div>;
  }

  return <>{children}</>;
};

function decodeKeycloakToken(keycloakToken: string): KeycloakUser {
  const decoded = jwtDecode<KeycloakTokenParsed>(keycloakToken);
  const fromToken: KeycloakUser = {
    userName: decoded["preferred_username"],
    email: decoded["email"],
    firstName: decoded["given_name"],
    lastName: decoded["family_name"],
    companyId: decoded["companyId"],
    locale: decoded["locale"],
    token: keycloakToken,
    roles: decoded["realm_access"]?.["roles"] ?? [],
  };
  return fromToken;
}

export function KeycloakProvider({ children }: PropsWithChildren) {
  return (
    <ReactKeycloakProvider
      initOptions={{ onLoad: "login-required" }}
      authClient={keycloakClient}
      onTokens={({ token }) => {
        if (!token) {
          console.error("No token received from Keycloak");
          return;
        }
        sigUser.value = decodeKeycloakToken(token);
      }}
    >
      <KeycloakImpl>
        <StrictMode>{children}</StrictMode>
      </KeycloakImpl>
    </ReactKeycloakProvider>
  );
}
