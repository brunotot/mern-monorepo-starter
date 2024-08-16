import {
  QueryClient,
  QueryClientProvider as InternalQueryClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

export function QueryClientProvider({ children }: PropsWithChildren) {
  return <InternalQueryClientProvider client={queryClient}>{children}</InternalQueryClientProvider>;
}
