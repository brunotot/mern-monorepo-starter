// import "@tsvdec/decorators";
//! TODO: Uncomment if any errors from library

import "./config";

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1); // mandatory (as per the Node.js docs)
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1); // mandatory (as per the Node.js docs)
});

import { App } from "./App";

function main() {
  const app = new App();
  app.listen();
}

main();
