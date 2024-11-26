import type React from "react";

import * as mui from "@mui/material";

export type LabelInputGroupProps = {
  children: React.ReactNode;
  label: string;
};

export function LabelInputGroup({ label, children }: LabelInputGroupProps) {
  return (
    <mui.Box display="flex" flexDirection="column" gap={1}>
      <mui.Typography variant="subtitle2">{label}</mui.Typography>
      {children}
    </mui.Box>
  );
}
