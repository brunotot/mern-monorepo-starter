import { TODO } from "@org/shared";

export function sprintf(str: string, ...args: TODO[]) {
  return str.replace(/{(\d+)}/g, function (match, number) {
    return typeof args[number] != "undefined" ? args[number] : match;
  });
}
