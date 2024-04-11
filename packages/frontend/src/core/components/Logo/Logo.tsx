import { SmartToy } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export function Logo() {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      paddingBlock={1.5}
      paddingLeft={3}
      paddingRight={3.5}
    >
      <SmartToy fontSize="large" color="primary" />
      <Typography variant="h6" textTransform="uppercase">
        Demo App
      </Typography>
    </Box>
  );
}
