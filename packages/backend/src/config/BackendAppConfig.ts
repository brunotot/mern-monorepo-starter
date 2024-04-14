import { VAR_ALLOWED_ORIGINS } from "./vars/allowedOrigins";
import { DatabaseConnectionParams } from "./vars/databaseConnectionParams";
import { VAR_USER_ROLES } from "./vars/userRoles";
import { VAR_ZOD_ENVIRONMENT } from "./vars/zodEnvironment";

export class BackendAppConfig {
  public env = VAR_ZOD_ENVIRONMENT;
  public allowedOrigins = VAR_ALLOWED_ORIGINS;
  public databaseConnectionParams: DatabaseConnectionParams;
  public userRoles = VAR_USER_ROLES;

  constructor() {
    // NOOP
  }
}

/** @hidden */
export const $BackendAppConfig = new BackendAppConfig();
