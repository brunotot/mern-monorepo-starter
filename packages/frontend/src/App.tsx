import LightModeIcon from "@mui/icons-material/LightMode";
import {} from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import "./App.css";
import { Layout } from "./core/layout/Layout";
import { SidebarProvider } from "./core/layout/Layout/impl/SidebarLayout/SidebarProvider";
import { LayoutProvider } from "./core/layout/LayoutProvider";
import { LocalizationProvider } from "./core/localization/components/LocalizationProvider";
import "./core/localization/i18n";
import ThemeBorderRadiusSlider from "./core/theme/components/ThemeBorderRadiusSlider";
import ThemeProvider from "./core/theme/components/ThemeProvider";

const ThemeShowcaseComponent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "16px",
        margin: "16px",
        textAlign: "center",
        borderRadius: "var(--mui-shape-borderRadius)",
      }}
    >
      <Card
        sx={{
          margin: "16px",
          borderRadius: "var(--mui-shape-borderRadius)",
        }}
      >
        <CardContent>
          <Typography variant="h5" component="div">
            {t("test")}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "16px" }}>
            Check out how the theme changes are applied.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px", marginBottom: "16px" }}
          >
            Press Me
          </Button>
          <Switch
            checked={true}
            onChange={() => {
              /* Handle theme toggle */
            }}
            inputProps={{ "aria-label": "controlled" }}
          />
          <IconButton aria-label="toggle theme" color="primary">
            <LightModeIcon />
          </IconButton>
        </CardContent>
      </Card>
    </Paper>
  );
};

export function App() {
  return (
    <LocalizationProvider>
      <ThemeProvider>
        <LayoutProvider>
          <SidebarProvider>
            <Layout>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                marginTop={4}
                gap={2}
              >
                <ThemeBorderRadiusSlider />
              </Box>
              <ThemeShowcaseComponent />
            </Layout>
          </SidebarProvider>
        </LayoutProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
