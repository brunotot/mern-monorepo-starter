import { Box } from "@mui/material";

export type FixedBadgeProps = {
  value: number | undefined;
};

const PADDING_INLINE = 0.75;
const BORDER_RADIUS = 0.75;

export function FixedBadge({ value }: FixedBadgeProps) {
  if (value === undefined) return null;
  const text = value > 99 ? "99+" : String(value);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontFamily="monospace"
      fontWeight="bold"
      color="primary.main"
      paddingInline={PADDING_INLINE}
      borderRadius={BORDER_RADIUS}
      sx={{ backgroundColor: "var(--mui-palette-background-paper)" }}
    >
      {text}
    </Box>
  );
}
