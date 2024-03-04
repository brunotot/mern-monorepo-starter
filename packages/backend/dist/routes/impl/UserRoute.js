import { inject } from "../../config";
import { User } from "../../form/UserForm";
import { validateForm } from "../../middleware/validateForm";
import { Route } from "../Route";
export class UserRoute extends Route {
    constructor() {
        super("/users");
        this.userController = inject("userController");
    }
    // prettier-ignore
    endpoints() {
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
//# sourceMappingURL=UserRoute.js.map