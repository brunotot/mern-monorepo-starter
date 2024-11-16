import * as mui from "@mui/material";
import React from "react";

export type ConfirmDialogProps = ConfirmVisualProps & {
  onCancel: () => void;
  open: boolean;
};

function ConfirmDialog({
  title,
  message,
  open,
  onConfirm,
  onCancel,
  color = "error",
  cancelText = "Cancel",
  confirmText = "Confirm",
}: ConfirmDialogProps) {
  return (
    <mui.Dialog open={open} onClose={onCancel}>
      <mui.DialogTitle color={color}>{title}</mui.DialogTitle>
      <mui.DialogContent>
        <mui.DialogContentText>{message}</mui.DialogContentText>
      </mui.DialogContent>
      <mui.DialogActions>
        <mui.Button color="inherit" onClick={onCancel}>
          {cancelText}
        </mui.Button>
        <mui.Button variant="contained" onClick={onConfirm} color={color}>
          {confirmText}
        </mui.Button>
      </mui.DialogActions>
    </mui.Dialog>
  );
}

export type ConfirmVisualProps = {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  color?: mui.BaseTextFieldProps["color"];
  onConfirm: () => Promise<void>;
};

// eslint-disable-next-line react-refresh/only-export-components
function useConfirmLocal() {
  const [open, setOpen] = React.useState(false);

  const [confirmDialogVisualProps, setConfirmDialogVisualProps] =
    React.useState<ConfirmVisualProps>({
      title: "",
      message: "",
      onConfirm: async () => {},
    });

  const confirmAction = (confirmVisualProps: ConfirmVisualProps) => {
    setConfirmDialogVisualProps({
      ...confirmVisualProps,
      onConfirm: async () => {
        await confirmVisualProps.onConfirm();
        setOpen(false);
      },
    });
    setOpen(true);
  };

  const onCancel = () => {
    setOpen(false);
  };

  return { confirmAction, open, onCancel, ...confirmDialogVisualProps };
}

export const ConfirmContext = React.createContext<
  ((confirmVisualProps: ConfirmVisualProps) => void) | undefined
>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useConfirm() {
  const confirmAction = React.useContext(ConfirmContext);
  if (!confirmAction) {
    throw new Error("useConfirm must be used within a ConfirmProvider");
  }
  return confirmAction;
}
export function ConfirmProvider({ children }: React.PropsWithChildren) {
  const { confirmAction, ...confirmDialogProps } = useConfirmLocal();

  return (
    <ConfirmContext.Provider value={confirmAction}>
      <ConfirmDialog {...confirmDialogProps} />
      {children}
    </ConfirmContext.Provider>
  );
}
