import { Required } from "@tsvdec/core";
import { Role } from "../config/vars/userRoles";

export class User {
  @Required()
  username: string = "";

  @Required()
  password: string = "";

  @Required()
  email: string = "";

  roles: Role[] = [Role.USER];
  refreshToken: string[] = [];
}
