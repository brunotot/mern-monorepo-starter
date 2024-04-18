import { Box, Breakpoint, Container, Link, Typography } from "@mui/material";
import { MuiSxProps } from "../Header";

export type FooterProps = {
  backgroundColor?: string;
  maxWidth?: false | Breakpoint;
  sx?: MuiSxProps;
};

export function Footer({ backgroundColor, maxWidth = false }: FooterProps) {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor,
      }}
    >
      <Container
        maxWidth={maxWidth}
        sx={{ paddingInline: maxWidth === false ? "0 !important" : undefined }}
      >
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box display="flex" flexDirection="column" gap={0.5} alignItems="center">
            <Link href="https://brunotot.github.io/monorepo-mern-railway-starter/" target="_blank">
              TypeDoc source
            </Link>
            <Link
              href="https://monorepo-mern-railway-starter-backend.up.railway.app/api-docs/"
              target="_blank"
            >
              Swagger API
            </Link>
            <Typography>Demo App © {new Date().getFullYear()}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
