import { App } from "./App";
import { initializeDI, inject } from "./config";
initializeDI();
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
const app = new App([inject("userRoute")]);
app.listen();
//# sourceMappingURL=index.js.map