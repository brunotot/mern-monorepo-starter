import "@org/app-vite-react/setup/i18n.setup";
import "@org/app-vite-react/main.css";
import { reactServer } from "@org/app-vite-react/setup/reactServer.setup";

import { routes } from "@org/app-vite-react/app/routes";
import { themeColors, themeConfig } from "@org/app-vite-react/app/theme";

//

reactServer.run({
  routes,
  theme: {
    colors: themeColors,
    config: themeConfig,
  },
});
