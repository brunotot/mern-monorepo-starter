import { App } from "./App";

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  //process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection at:", promise, "reason:", reason);
  //process.exit(1);
});

export default new App();
