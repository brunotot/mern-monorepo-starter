import { StrictMode, type PropsWithChildren } from "react";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import { keycloakClient } from "@org/app-vite-react/setup/keycloakClient.setup";
import { decodeUserData, sigUser } from "@org/app-vite-react/signals/sigUser";
import { sigToken } from "@org/app-vite-react/signals/sigToken";
import { sigKeycloak } from "@org/app-vite-react/signals/sigKeycloak";

const KeycloakAuthContent = ({ children }: PropsWithChildren) => {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!keycloak.authenticated) {
    return <div>Not authenticated</div>;
  }

  sigKeycloak.value = keycloak;
  return <>{children}</>;
};

export function KeycloakAuthProvider({ children }: PropsWithChildren) {
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
        sigUser.value = decodeUserData(token);
      }}
    >
      <KeycloakAuthContent>
        <StrictMode>{children}</StrictMode>
      </KeycloakAuthContent>
    </ReactKeycloakProvider>
  );
}
