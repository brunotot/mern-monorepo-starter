import server from "./server";

(async () => {
  await server.prepare();
  server.start();
})();
