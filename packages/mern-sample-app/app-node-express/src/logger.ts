import * as Winston from "winston";

export const log = createLogger();

function createLogger(): Winston.Logger {
  Winston.addColors({
    error: "red",
    warn: "yellow",
    info: "cyan",
    debug: "green",
  });

  return Winston.createLogger({
    format: Winston.format.combine(
      Winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      Winston.format.json(),
    ),
    transports: [
      new Winston.transports.Console({
        format: Winston.format.combine(
          Winston.format.colorize(),
          Winston.format.printf(
            info => `[${info.timestamp}] ${getLogLevelPrettyPrinted(info.level)}: ${info.message}`,
          ),
        ),
      }),
    ],
  });
}

function getLogLevelPrettyPrinted(coloredLogLevel: string) {
  const AVAILABLE_LOG_LEVELS = ["error", "warn", "info", "debug"];
  const COLORED_LOG_OFFSET = 10;

  const longestLogLevelCharLength = AVAILABLE_LOG_LEVELS.reduce(
    (acc, lvl) => Math.max(acc, lvl.length),
    0,
  );

  const coloredRawLogLevelLength = coloredLogLevel.length - COLORED_LOG_OFFSET;
  const diff = longestLogLevelCharLength - coloredRawLogLevelLength;
  const repeat = diff > 0 ? diff : 0;
  return " ".repeat(repeat) + coloredLogLevel;
}
