import {
  QueryClient,
  QueryClientProvider as InternalQueryClientProvider,
} from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <InternalQueryClientProvider client={queryClient}>{children}</InternalQueryClientProvider>;
}
