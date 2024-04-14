import { Outlet } from "react-router-dom";
import { Layout } from "../../components/Layout/Layout";
import { SidebarProvider } from "../../hooks";
import { AuthProvider } from "../../hooks/useAuthContext";
import { LayoutProvider } from "../../hooks/useLayoutContext";
import { LocalizationProvider } from "../../hooks/useLocalizationContext";
import { ThemeProvider } from "../../hooks/useThemeContext";

export function RootLayoutPage() {
  return (
    <AuthProvider>
      <LocalizationProvider>
        <ThemeProvider>
          <LayoutProvider>
            <SidebarProvider>
              <Layout>
                <Outlet />
              </Layout>
            </SidebarProvider>
          </LayoutProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
