var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { connect, set } from "mongoose";
import { getVar } from "./../config/vars.config";
export const databaseConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const dbConfig = {
        url: `mongodb://${getVar("DB_HOST")}:${getVar("DB_PORT")}`,
        options: {
            dbName: getVar("DB_DATABASE"),
        },
    };
    if (getVar("NODE_ENV") !== "production") {
        set("debug", true);
    }
    yield connect(dbConfig.url, dbConfig.options);
});
//# sourceMappingURL=database.config.js.map