import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export function InputThemeToggle() {
  const { t } = useTranslation();
  const { mode, setMode } = useColorScheme();
  const isDarkMode = mode === "dark";

  const handleToggle = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <Tooltip title={isDarkMode ? t("setDarkMode") : t("setLightMode")}>
      <IconButton onClick={handleToggle}>
        {isDarkMode ? <DarkMode /> : <LightMode />}
      </IconButton>
    </Tooltip>
  );
}
