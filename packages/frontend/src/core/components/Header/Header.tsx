import { Menu } from "@mui/icons-material";
import {
  Box,
  Breakpoint,
  Container,
  IconButton,
  SxProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSidebarContext } from "../../hooks";
import { FuzzySearch } from "../FuzzySearch/FuzzySearch";
import { LayoutToggleButton } from "../LayoutToggleButton/LayoutToggleButton";
import { LocaleSelectButton } from "../LocaleSelectButton";
import { ThemeModeToggleButton } from "../ThemeModeToggleButton";

export type MuiSxProps = SxProps<Theme>;

export type HeaderProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  borderBottom?: boolean;
  sx?: MuiSxProps;
};

export function Header({
  backgroundColor,
  maxWidth = false,
  borderBottom = false,
  sx,
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
      <Container maxWidth={maxWidth} sx={{ paddingInline: "0 !important" }}>
        <Box display="flex" alignItems="center" gap={1} sx={sx}>
          {!matchesDesktop && (
            <IconButton onClick={() => setSidebarOpen((prev) => !prev)}>
              <Menu />
            </IconButton>
          )}

          <Box flexGrow={1}>
            <FuzzySearch placeholder={t("doSearch")} />
          </Box>

          <Box display="flex" alignItems="center">
            <ThemeModeToggleButton />
            <LocaleSelectButton />
            <LayoutToggleButton />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
