import type { Breakpoint } from "@mui/material";
import type { MuiSxProps } from "@/app/components/Header";

import { Box, Container, Link, Typography } from "@mui/material";

export type FooterProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  sx?: MuiSxProps;
};

export function Footer({ backgroundColor, maxWidth = false }: FooterProps) {
  return (
    <Box
      data-driver="footer"
      component="footer"
      sx={{
        mt: 3,
        backgroundColor,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{ paddingInline: maxWidth === false ? "0 !important" : undefined }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box display="flex" flexDirection="column" gap={0.5} alignItems="center">
            <Link href="https://brunotot.github.io/mern-monorepo-starter/" target="_blank">
              TypeDoc source
            </Link>
            <Link href={`${import.meta.env.VITE_API_CLIENT_URL}/api-docs/`} target="_blank">
              Swagger API
            </Link>
            <Typography>@org © {new Date().getFullYear()}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
