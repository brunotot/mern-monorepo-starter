import "./index";
import "./config";
import { App } from "./App";

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // mandatory (as per the Node.js docs)
});

function main() {
  const app = new App();
  app.listen();
}

main();
