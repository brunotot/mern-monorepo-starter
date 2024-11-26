import type { PropsWithChildren } from "react";

import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "@tanstack/react-query";

import { tsrQuery } from "../@ts-rest/tsRestApiClient";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

export function QueryClientProvider({ children }: PropsWithChildren) {
  return (
    <TanstackQueryClientProvider client={queryClient}>
      <tsrQuery.ReactQueryProvider>{children}</tsrQuery.ReactQueryProvider>
    </TanstackQueryClientProvider>
  );
}
