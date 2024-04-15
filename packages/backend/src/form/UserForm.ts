import { Role } from "@org/shared";
import { Required } from "@tsvdec/core";

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
