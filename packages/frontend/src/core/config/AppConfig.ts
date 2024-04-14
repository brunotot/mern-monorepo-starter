import { i18n } from "i18next";
import { NavigationRoutes, VAR_I18N, VAR_NAVIGATION_ROUTES } from "./vars";
import { MuiTheme, VAR_MUI_THEME } from "./vars/muiTheme";

export class AppConfig {
  public navigationRoutes: NavigationRoutes = VAR_NAVIGATION_ROUTES;
  public i18n: i18n = VAR_I18N;
  public muiTheme: MuiTheme = VAR_MUI_THEME;

  constructor() {
    // NOOP
  }
}

/** @hidden */
export const $AppConfig = new AppConfig();
