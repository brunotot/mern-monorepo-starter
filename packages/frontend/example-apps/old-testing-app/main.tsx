import { ReactApp } from "../../src/core";
import { VAR_NAVIGATION_ROUTES as routes } from "./routes";
import theme from "./theme";

ReactApp.getInstance().run({ routes, theme });
