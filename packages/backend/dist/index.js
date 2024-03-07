var _a;
import { App } from "./App";
import { initializeDI2 } from "./config";
import "./config/registered-instances";
// @ts-expect-error
(_a = Symbol.metadata) !== null && _a !== void 0 ? _a : (Symbol.metadata = Symbol("Symbol.metadata"));
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
initializeDI2();
const app = new App();
app.listen();
//# sourceMappingURL=index.js.map