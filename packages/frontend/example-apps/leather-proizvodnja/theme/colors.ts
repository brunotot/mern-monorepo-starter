import { MuiThemeConfig } from "../../../src/core";
import { colors } from "@mui/material";

export default {
  primary: colors.blue["700"],
  secondary: colors.purple["500"],
  success: colors.green["800"],
  warning: colors.orange["800"],
  error: colors.red["700"],
  info: colors.lightBlue["700"],
} satisfies MuiThemeConfig["colors"];
