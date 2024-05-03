import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as MuiThemeProvider } from "@mui/material/styles";
import { StylesProvider } from "@mui/styles";
import { Outlet } from "react-router-dom";
import { sigTheme } from "../../../signals";
import { Layout } from "../../layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={sigTheme.value}>
          <CssBaseline />
          <Layout>
            <Outlet />
          </Layout>
        </MuiThemeProvider>
      </StylesProvider>
    </QueryClientProvider>
  );
}
