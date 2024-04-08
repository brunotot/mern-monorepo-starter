import { Menu } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocaleSelectBox } from "../../../../localization/components/LocaleSelectBox";
import { ThemeModeSwitch } from "../../../../theme";
import { useSidebarContext } from "../../impl";
import { FuzzySearch } from "../FuzzySearch/FuzzySearch";

export type HeaderProps = {};

export function Header({}: HeaderProps) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const { setSidebarOpen } = useSidebarContext();
  const { t } = useTranslation();

  return (
    <Box component="header" display="flex" alignItems="center" gap={1}>
      {!matchesDesktop && (
        <IconButton onClick={() => setSidebarOpen((prev) => !prev)}>
          <Menu />
        </IconButton>
      )}

      <Box flexGrow={1}>
        <FuzzySearch placeholder={t("doSearch")} />
      </Box>

      <Box display="flex" alignItems="center">
        <ThemeModeSwitch />
        <LocaleSelectBox />
      </Box>
    </Box>
  );
}
