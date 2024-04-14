import { iocStartup } from "./bottlejs";

// Import all directories that need to be registered in the IoC container.
import "../../controllers";
import "../../infrastructure";

iocStartup();
