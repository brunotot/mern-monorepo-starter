import { Menu } from "@mui/icons-material";
import {
  Box,
  Breakpoint,
  Container,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { LocaleSelectBox } from "../../../../localization/components/LocaleSelectBox";
import { ThemeModeSwitch } from "../../../../theme";
import { useSidebarContext } from "../../impl";
import { FuzzySearch } from "../FuzzySearch/FuzzySearch";
import { LayoutSelectBox } from "../LayoutSelectBox/LayoutSelectBox";

export type HeaderProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  borderBottom?: boolean;
};

export function Header({
  backgroundColor,
  maxWidth = false,
  borderBottom = false,
}: HeaderProps) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  const { setSidebarOpen } = useSidebarContext();
  const { t } = useTranslation();

  return (
    <Box
      component="header"
      sx={{
        backgroundColor,
        borderBottom: borderBottom
          ? "1px solid var(--mui-palette-divider)"
          : undefined,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{ paddingInline: maxWidth === false ? "0 !important" : undefined }}
      >
        <Box display="flex" alignItems="center" gap={1} paddingBlock={1.5}>
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
            <LayoutSelectBox />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
