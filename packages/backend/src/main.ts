import "./config";

import { App } from "./App";

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

const app = new App();

app.listen();
