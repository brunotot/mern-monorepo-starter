import type * as KC from "@org/app-vite-react/lib/keycloak-js";

import { keycloakClient } from "@org/app-vite-react/lib/keycloak-js/KeycloakClient";
import { sigUser } from "@org/app-vite-react/signals/sigUser";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { jwtDecode } from "jwt-decode";
import { type KeycloakTokenParsed } from "keycloak-js";
import { StrictMode, type PropsWithChildren } from "react";


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

function decodeKeycloakToken(keycloakToken: string): KC.KeycloakUser {
  const decoded = jwtDecode<KeycloakTokenParsed>(keycloakToken);

  const fromToken: KC.KeycloakUser = {
    username: decoded["preferred_username"],
    token: keycloakToken,
    roles: (decoded["realm_access"]?.["roles"] ?? []) as KC.KeycloakUserRole[],
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
