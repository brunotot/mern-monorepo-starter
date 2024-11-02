import { ConfirmProvider as MuiConfirmProvider } from "material-ui-confirm";

export function ConfirmProvider({ children }: React.PropsWithChildren) {
  return <MuiConfirmProvider>{children}</MuiConfirmProvider>;
}
