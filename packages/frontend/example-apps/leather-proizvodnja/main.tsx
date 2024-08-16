import { ReactApp } from "../../src/core";
import routes from "./routes";
import theme from "./theme";

ReactApp.getInstance().run({
  routes,
  theme,
});
