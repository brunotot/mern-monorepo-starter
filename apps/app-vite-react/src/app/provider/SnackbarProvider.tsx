import * as mui from "@mui/material";
import React from "react";

type SnackbarProps = {
  severity?: NonNullable<mui.AlertProps["severity"]>;
  variant?: NonNullable<mui.AlertProps["variant"]>;
  autoHideDuration?: number;
  open: boolean;
  onClose: () => void;
  body: React.ReactNode;
};

function Snackbar({
  body,
  open,
  onClose,
  severity = "info",
  variant = "filled",
  autoHideDuration = 5000,
}: SnackbarProps) {
  return (
    <mui.Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <mui.Alert onClose={onClose} severity={severity} variant={variant} sx={{ width: "100%" }}>
        {body}
      </mui.Alert>
    </mui.Snackbar>
  );
}

export type PartialSnackbarProps = Omit<SnackbarProps, "open" | "onClose">;

// eslint-disable-next-line react-refresh/only-export-components
function useSnackbarLocal() {
  const [open, setOpen] = React.useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const [localSnackbarProps, setLocalSnackbarProps] = React.useState<PartialSnackbarProps>({
    body: "",
  });

  const snack = (snackbarProps: PartialSnackbarProps) => {
    setLocalSnackbarProps(snackbarProps);
    setOpen(true);
  };

  const snackbarProps: SnackbarProps = {
    ...localSnackbarProps,
    open,
    onClose,
  };

  return { snackbarProps, snack };
}

// eslint-disable-next-line react-refresh/only-export-components
export const SnackbarContext = React.createContext<
  ((snackbarProps: PartialSnackbarProps) => void) | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useSnackbar() {
  const snack = React.useContext(SnackbarContext);
  if (!snack) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return snack;
}
export function SnackbarProvider({ children }: React.PropsWithChildren) {
  const { snackbarProps, snack } = useSnackbarLocal();

  return (
    <SnackbarContext.Provider value={snack}>
      <Snackbar {...snackbarProps} />
      {children}
    </SnackbarContext.Provider>
  );
}
