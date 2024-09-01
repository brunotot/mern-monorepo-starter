import { log } from "./setup/log.setup";
import { server } from "./setup/server.setup";

//

(async () => {
  try {
    await server.init();
    await server.startListening();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: unknown) {
    console.log(error);
    if (typeof error === "object" && error !== null && "message" in error) {
      log.error((error as { message: string }).message);
    } else {
      log.error(error);
    } //
    process.exit(1);
  }
})();
