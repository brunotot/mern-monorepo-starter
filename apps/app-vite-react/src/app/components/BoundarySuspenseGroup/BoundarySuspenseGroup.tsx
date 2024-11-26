import type { NavigationRouteProtectParam } from "@/server/route-typings";

import { LoaderSuspense } from "../LoaderSuspense";
import { Protect } from "../Protect";
import { QueryErrorBoundary } from "../QueryErrorBoundary";

export type BoundarySuspenseGroupProps = {
  protect?: NavigationRouteProtectParam;
  children: React.ReactNode;
};

export function BoundarySuspenseGroup({ protect, children }: BoundarySuspenseGroupProps) {
  return (
    <QueryErrorBoundary>
      <LoaderSuspense>
        <Protect protect={protect}>{children}</Protect>
      </LoaderSuspense>
    </QueryErrorBoundary>
  );
}
