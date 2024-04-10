import {} from "@mui/lab";
import { Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthProvider from "./core/context/AuthProvider";
import { Layout } from "./core/layout/Layout";
import { SidebarProvider } from "./core/layout/Layout/impl/SidebarLayout/SidebarProvider";
import { LayoutProvider } from "./core/layout/LayoutProvider";
import { LocalizationProvider } from "./core/localization/components/LocalizationProvider";
import "./core/localization/i18n";
import router from "./core/router/router";
import ThemeProvider from "./core/theme/components/ThemeProvider";

export type ErrorBoundaryProps = {};

export function ErrorBoundary({}: ErrorBoundaryProps) {
  return <div>Something went wrong</div>;
}

export function BaseLayout() {
  return (
    <LocalizationProvider>
      <ThemeProvider>
        <LayoutProvider>
          <SidebarProvider>
            <Layout>
              <AuthProvider>
                <Outlet />
              </AuthProvider>
            </Layout>
          </SidebarProvider>
        </LayoutProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export function App() {
  return <RouterProvider router={router} fallbackElement={<div>Test</div>} />;
}
