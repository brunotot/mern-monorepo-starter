import * as mui from "@mui/material";
import { Suspense } from "react";

export function LoaderSuspense({ children }: React.PropsWithChildren) {
  return (
    <Suspense
      fallback={
        <mui.Box sx={{ textAlign: "center", padding: 3 }}>
          <mui.CircularProgress />
        </mui.Box>
      }
    >
      {children}
    </Suspense>
  );
}
