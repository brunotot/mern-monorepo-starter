import { Box, Breakpoint, Container, Typography } from "@mui/material";
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
          <Typography>Demo App © {new Date().getFullYear()}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
