import { getDirname } from "cross-dirname";
import { config } from "dotenv";
import path from "path";
config({
    path: path.join(getDirname(), "../../", `.env.${process.env.NODE_ENV || "development"}.local`),
});
export function getVar(key) {
    var _a;
    return (_a = process.env[key]) !== null && _a !== void 0 ? _a : "";
}
//# sourceMappingURL=vars.config.js.map