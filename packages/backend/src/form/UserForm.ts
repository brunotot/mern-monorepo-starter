import { Required } from "@tsvdec/core";

export class User {
  @Required()
  username: string = "";

  @Required()
  password: string = "";

  @Required()
  email: string = "";
}
