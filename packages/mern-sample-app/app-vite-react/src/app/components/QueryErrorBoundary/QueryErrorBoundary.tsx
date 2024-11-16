import * as mui from "@mui/material";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

export function QueryErrorBoundary({ children }: React.PropsWithChildren) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={({ error, resetErrorBoundary }) => (
            <mui.Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
              bgcolor="background.default"
              p={4}
              borderRadius={2}
              boxShadow={2}
            >
              <mui.Box textAlign="center">
                <mui.Typography variant="h5" color="error.main" gutterBottom>
                  ⚠️ Error
                </mui.Typography>
                <pre style={{ textAlign: "left" }}>{JSON.stringify(error, null, 2)}</pre>
                <mui.Button
                  variant="contained"
                  color="primary"
                  onClick={() => resetErrorBoundary()}
                >
                  Retry
                </mui.Button>
              </mui.Box>
            </mui.Box>
          )}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
