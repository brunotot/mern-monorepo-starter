import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeColorSchema } from "../colors";
import { useThemeContext } from "../hooks";

function ThemeColorItem({ schema }: { schema: ThemeColorSchema }) {
  return (
    <Box
      sx={{ outlineOffset: "1px", outline: `1px solid ${schema.primary}` }}
      display="flex"
      width="100px"
      borderRadius="var(--mui-shape-borderRadius)"
      height="1.45em"
    >
      <Box
        width="65%"
        sx={{
          borderTopLeftRadius: "var(--mui-shape-borderRadius)",
          borderBottomLeftRadius: "var(--mui-shape-borderRadius)",
          backgroundColor: schema.primary,
        }}
      ></Box>
      <Box
        width="35%"
        sx={{
          borderTopRightRadius: "var(--mui-shape-borderRadius)",
          borderBottomRightRadius: "var(--mui-shape-borderRadius)",
          backgroundColor: schema.secondary,
        }}
      ></Box>
    </Box>
  );
}

export function ThemeColorsSelect() {
  const { t } = useTranslation();
  const { themeConfig, setThemeConfig } = useThemeContext();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (event: any) => {
    const selection = event.target.value;
    setThemeConfig({ colorSchemaName: selection });
  };

  return <div></div>;
}
