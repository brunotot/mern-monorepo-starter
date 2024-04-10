import { Outlet } from "react-router-dom";
import { LayoutRenderer } from "../../layout/Layout";
import { SidebarProvider } from "../../layout/Layout/impl";
import AuthProvider from "../../provider/AuthProvider";
import { LayoutProvider } from "../../provider/LayoutProvider";
import { LocalizationProvider } from "../../provider/LocalizationProvider";
import ThemeProvider from "../../provider/ThemeProvider";

export function RootLayoutPage() {
  return (
    <AuthProvider>
      <LocalizationProvider>
        <ThemeProvider>
          <LayoutProvider>
            <SidebarProvider>
              <LayoutRenderer>
                <Outlet />
              </LayoutRenderer>
            </SidebarProvider>
          </LayoutProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
