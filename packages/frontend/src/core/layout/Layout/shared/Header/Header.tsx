import { Menu } from "@mui/icons-material";
import {
  Box,
  Breakpoint,
  Button,
  Container,
  IconButton,
  SwipeableDrawer,
  SxProps,
  Theme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LocaleSelectBox } from "../../../../components/LocaleSelectBox";
import { ThemeModeSwitch } from "../../../../components/ThemeModeSwitch";
import { useSidebarContext } from "../../../../hooks";
import { SidebarNavContent } from "../../impl/SidebarLayout/SidebarNavContent";
import { FuzzySearch } from "../FuzzySearch/FuzzySearch";
import { LayoutSelectBox } from "../LayoutSelectBox/LayoutSelectBox";

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

  const [bottomOpen, setBottomOpen] = useState(false);

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
        <SwipeableDrawer
          anchor="bottom"
          open={bottomOpen}
          onClose={() => setBottomOpen(false)}
          onOpen={() => setBottomOpen(true)}
        >
          <SidebarNavContent />
        </SwipeableDrawer>

        <Box display="flex" alignItems="center" gap={1} sx={sx}>
          {!matchesDesktop && (
            <IconButton onClick={() => setSidebarOpen((prev) => !prev)}>
              <Menu />
            </IconButton>
          )}

          <Box>
            <Button
              onClick={() => setBottomOpen(true)}
              variant="contained"
              color="primary"
            >
              BOTTOM
            </Button>
          </Box>

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
