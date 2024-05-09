import z from "zod";
export const Role = z.enum(["ADMIN", "USER"]);
export const VAR_USER_ROLES = Role.options;
export const ObjectId = String;
//# sourceMappingURL=TypeUtils.js.map
