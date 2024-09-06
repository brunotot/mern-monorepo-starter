import { StrictMode, type PropsWithChildren } from "react";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { sigUser } from "@org/app-vite-react/signals/sigUser";
import { sigToken } from "@org/app-vite-react/signals/sigToken";
import { decodeKeycloakToken } from "@org/app-vite-react/lib/keycloak-js/KeycloakUser";
import { keycloakClient } from "@org/app-vite-react/lib/keycloak-js/KeycloakClient";

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
        sigToken.value = token;
        sigUser.value = decodeKeycloakToken(token);
      }}
    >
      <KeycloakImpl>
        <StrictMode>{children}</StrictMode>
      </KeycloakImpl>
    </ReactKeycloakProvider>
  );
}
