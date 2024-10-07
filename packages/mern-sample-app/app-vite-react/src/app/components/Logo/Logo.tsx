import { Box, Typography } from "@mui/material";

export type LogoProps = {
  hideText?: boolean;
};

export function Logo({ hideText = false }: LogoProps) {
  return (
    <Box display="flex" alignItems="center" gap={1} data-driver="">
      <Box
        component="img"
        alt="Logo"
        src="/svg/logo.svg"
        sx={{
          height: 48,
          width: 48,
        }}
      />
      {!hideText && (
        <Typography whiteSpace="nowrap" textTransform="uppercase" fontWeight="bold">
          app-vite-react
        </Typography>
      )}
    </Box>
  );
}
