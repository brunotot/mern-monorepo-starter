import { Outlet } from "react-router-dom";
import { SidebarProvider } from "../../hooks";
import { AuthProvider } from "../../hooks/useAuthContext";
import { LayoutProvider } from "../../hooks/useLayoutContext";
import { LocalizationProvider } from "../../hooks/useLocalizationContext";
import { ThemeProvider } from "../../hooks/useThemeContext";
import { LayoutRenderer } from "../../layout";

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
