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
import { sigSidebarOpen } from "../../../signals";
import {
  InputLayoutToggle,
  InputLocaleSelect,
  InputThemeToggle,
} from "../../inputs";
import { InputFuzzySearch } from "../../inputs/InputFuzzySearch";

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
        <Box
          display="flex"
          alignItems="center"
          paddingInline={matchesDesktop ? "1rem" : 0}
          gap={1}
          sx={sx}
        >
          {!matchesDesktop && (
            <IconButton
              onClick={() => (sigSidebarOpen.value = !sigSidebarOpen.value)}
            >
              <Menu />
            </IconButton>
          )}

          <Box flexGrow={1}>
            <InputFuzzySearch placeholder={t("doSearch")} />
          </Box>

          <Box display="flex" alignItems="center">
            <InputThemeToggle />
            <InputLocaleSelect />
            {matchesDesktop && <InputLayoutToggle />}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
