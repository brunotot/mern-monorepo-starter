import { getDirname } from "cross-dirname";
import { config } from "dotenv";
import path from "path";

config({
  path: path.join(
    getDirname(),
    "../../",
    `.env.${process.env.NODE_ENV || "development"}.local`
  ),
});

export function getVar(key: string): string {
  return process.env[key] ?? "";
}
