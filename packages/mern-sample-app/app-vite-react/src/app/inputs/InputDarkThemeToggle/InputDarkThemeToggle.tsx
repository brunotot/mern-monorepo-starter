import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslation } from "@org/app-vite-react/lib/i18next";

export type InputDarkThemeToggleProps = {
  value: boolean;
  onChange: (dark: boolean) => void;
};

export function InputDarkThemeToggle({ value: dark, onChange }: InputDarkThemeToggleProps) {
  const t = useTranslation();
  const title = dark ? t("setDarkMode") : t("setLightMode");
  const icon = dark ? <DarkMode /> : <LightMode />;

  const onClick = () => {
    onChange(!dark);
  };

  return (
    <Tooltip title={title} data-driver="darkTheme">
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
}
