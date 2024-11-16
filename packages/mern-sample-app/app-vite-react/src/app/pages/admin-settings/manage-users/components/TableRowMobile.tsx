import * as mui from "@mui/material";

export type TableRowMobileProps = {
  title: string;
  subtitle: string;
};

export function TableRowMobile({ title, subtitle }: TableRowMobileProps) {
  return (
    <mui.Box
      sx={{
        width: "100%",
        borderRadius: 1,
        border: "1px solid",
        borderColor: "info.light",
        padding: 2,
      }}
    >
      <mui.Typography variant="h6" sx={{ fontWeight: 600 }}>
        {title}
      </mui.Typography>
      <mui.Typography variant="body2" color="text.secondary" sx={{ marginTop: 0.5 }}>
        {subtitle}
      </mui.Typography>
    </mui.Box>
  );
}
