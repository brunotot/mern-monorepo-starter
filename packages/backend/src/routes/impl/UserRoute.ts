import { inject } from "../../config";
import { User } from "../../form/UserForm";
import { validateForm } from "../../middleware/validateForm";
import { Route, RouteEndpoint } from "../Route";

export class UserRoute extends Route {
  public userController = inject("userController");

  constructor() {
    super("/users");
  }

  // prettier-ignore
  protected endpoints(): RouteEndpoint[] {
    return [
      { 
        path: "", 
        method: "get", 
        handler: this.userController.findAll,
      },
      { 
        path: "", 
        method: "post", 
        handler: this.userController.create, 
        middlewares: [validateForm(User)],
      }
    ];
  }
}
