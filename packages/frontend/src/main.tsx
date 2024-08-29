import "@org/frontend/setup/i18n.setup";
import "@org/frontend/main.css";
import { reactServer } from "@org/frontend/setup/reactServer.setup";

import { routes } from "@org/frontend/app/routes";
import { themeColors, themeConfig } from "@org/frontend/app/theme";

reactServer.run({
  routes,
  theme: {
    colors: themeColors,
    config: themeConfig,
  },
});
