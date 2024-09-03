import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { sigThemeOpts } from "@org/app-vite-react/signals/sigTheme";
import { useTranslation } from "react-i18next";

export function InputThemeToggle() {
  const { t } = useTranslation();

  const isDarkMode = !!sigThemeOpts.value?.dark;

  const handleToggle = () => {
    sigThemeOpts.value = { dark: !isDarkMode };
  };

  return (
    <Tooltip title={isDarkMode ? t("setDarkMode") : t("setLightMode")}>
      <IconButton onClick={handleToggle}>{isDarkMode ? <DarkMode /> : <LightMode />}</IconButton>
    </Tooltip>
  );
}
