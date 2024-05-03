export * from "./singleton/Bottle";
export * from "./singleton/Environment";
export * from "./singleton/Logger";
export * from "./singleton/MongoClient";
export * from "./singleton/InjectableManager";
export * from "./singleton/ContractManager";
export * from "./singleton/JwtManager"

import "./init";

process.on("uncaughtException", err => {
  console.error("There was an uncaught error", err);
  process.exit(1);
});
  
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});