import { Box, Typography } from "@mui/material";

export function Logo() {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      paddingBlock={1.5}
      paddingLeft={2}
      paddingRight={3.5}
    >
      <Box
        component="img"
        alt="Logo"
        src="/png/logo.png"
        sx={{
          height: 40,
          width: 40,
        }}
      />
      <Typography whiteSpace="nowrap" fontFamily="monospace" textTransform="uppercase">
        Leather proizvodnja
      </Typography>
    </Box>
  );
}
