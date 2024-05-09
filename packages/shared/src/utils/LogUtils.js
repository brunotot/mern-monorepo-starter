export function suppressConsole(handler) {
  const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
  };
  console.log = console.warn = console.error = function () {};
  try {
    return handler();
  } finally {
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.error = originalConsole.error;
  }
}
//# sourceMappingURL=LogUtils.js.map
