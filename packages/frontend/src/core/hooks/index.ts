import { Context, useContext } from "react";

function getFunctionName() {
  const stack = new Error().stack!;
  const stackLines = stack.split("\n");
  const callerIndex = 2;
  const callerStackLine = stackLines[callerIndex];
  const fullPath = callerStackLine.slice(
    callerStackLine.indexOf("at ") + 3,
    callerStackLine.indexOf(" (")
  );
  const lastIndexOfSlash = fullPath.lastIndexOf("/");
  const fromSlash = fullPath.slice(lastIndexOfSlash + 1);
  const result = fromSlash.substring(0, fromSlash.indexOf("."));
  return result;
}

export function makeContextHook<T>(context: Context<T | undefined>) {
  return function () {
    const hookFullName = getFunctionName();
    const value = useContext(context);
    const hookProviderName = hookFullName
      .replace("use", "")
      .replace("Context", "Provider");
    const error = `${hookFullName} must be used within a ${hookProviderName}`;
    if (!value) throw new Error(error);
    return value;
  };
}
