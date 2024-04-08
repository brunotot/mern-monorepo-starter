import { App } from "./App";
import { initializeDI2 } from "./config";
import "./config/registered-instances";
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
initializeDI2();
const app = new App();
app.listen();
//# sourceMappingURL=index.js.map