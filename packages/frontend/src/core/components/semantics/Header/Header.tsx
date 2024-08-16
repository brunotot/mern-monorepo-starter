import { Menu } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Breakpoint,
  Container,
  IconButton,
  Link,
  SxProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { sigSidebarOpen } from "../../../signals";
import { InputLayoutToggle, InputLocaleSelect, InputThemeToggle } from "../../inputs";
import { useMatches } from "react-router-dom";
import { TODO } from "@org/shared";
//import { InputFuzzySearch } from "../../inputs/InputFuzzySearch";

export type MuiSxProps = SxProps<Theme>;

export type HeaderProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  borderBottom?: boolean;
  sx?: MuiSxProps;
};

function ComputedBreadcrumbs() {
  const matches: TODO[] = useMatches();
  const crumbs = matches
    .filter(match => Boolean(match.handle?.crumb))
    .map(match => match.handle.crumb(match.data));

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {crumbs.map((crumb, index) => (
        <Link
          key={index}
          underline="hover"
          color={index === crumbs.length - 1 ? "text.primary" : "inherit"}
          href="/"
        >
          {crumb}
        </Link>
      ))}
    </Breadcrumbs>
  );
}

export function Header({
  backgroundColor,
  maxWidth = false,
  borderBottom = false,
  sx,
}: HeaderProps) {
  const matchesDesktop = useMediaQuery("(min-width:678px)");
  //const { t } = useTranslation();

  return (
    <Box
      component="header"
      sx={{
        backgroundColor,
        borderBottom: borderBottom ? "1px solid var(--mui-palette-divider)" : undefined,
      }}
    >
      <Container maxWidth={maxWidth} sx={{ paddingInline: "0 !important" }}>
        <Box
          display="flex"
          alignItems="center"
          paddingInline={matchesDesktop ? /*"1rem"*/ 0 : 0}
          gap={1}
          sx={sx}
        >
          {!matchesDesktop && (
            <IconButton onClick={() => (sigSidebarOpen.value = !sigSidebarOpen.value)}>
              <Menu />
            </IconButton>
          )}

          <Box flexGrow={1}>
            <ComputedBreadcrumbs />
            {/*<InputFuzzySearch placeholder={t("doSearch")} />*/}
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
