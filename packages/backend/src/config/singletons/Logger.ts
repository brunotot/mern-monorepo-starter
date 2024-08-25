import type { StreamOptions } from "morgan";
import {
  type Logger as WinstonLogger,
  addColors,
  createLogger as winstonCreateLogger,
  format,
  transports,
} from "winston";

const AVAILABLE_LOG_LEVELS = ["error", "warn", "info", "debug"];

export const log = createLogger();
export const stream = createStream(log);

/**
 *
 * An example output might be:
 *
 * ```
 * ┌──────────────────────────────────────┐
 * │   [Express] MERN Sample App v0.0.1   │
 * ├──────────────────────────────────────┤
 * │  🟢 NodeJS  : v21.7.0                │
 * │  🏠 Env     : development            │
 * │  📝 Swagger : /api-docs              │
 * │  🆔 PID     : 61178                  │
 * │  🧠 Memory  : 24.65 MB               │
 * │  📅 Started : 8/19/2024, 7:40:59 PM  │
 * └──────────────────────────────────────┘
 * ```
 */
export function logTable(props: { title: string; data: Record<string, string> }) {
  const title = props.title;
  const data = props.data;
  const kvSeparator = " : ";
  const padding = 2;

  const center = (text: string, length: number) => {
    const remainingSpace = length - text.length;
    const leftBorderCount = Math.floor(remainingSpace / 2);
    const rightBorderCount = remainingSpace - leftBorderCount;
    const left = " ".repeat(leftBorderCount);
    const right = " ".repeat(rightBorderCount);
    return `${left}${text}${right}`;
  };

  const spacer = " ".repeat(padding);
  const hrY = kvSeparator;
  const maxKeyLength = Math.max(...Object.keys(data).map(key => key.length));

  const keyValueLengths = Object.values(data).map(
    value => maxKeyLength + hrY.length + value.length,
  );

  const containerWidth = Math.max(title.length, ...keyValueLengths) + padding * 2;

  const hrX = `${"─".repeat(containerWidth)}`;

  const content = Object.entries(data).map(([key, value]) => {
    const keyPadding = " ".repeat(maxKeyLength - key.length);
    const text = `${key}${keyPadding}${hrY}${value}`;
    const remainder = " ".repeat(containerWidth - text.length - spacer.length * 2);
    return `│${spacer}${text}${remainder}${spacer}│`;
  });

  console.info(`┌${hrX}┐`);
  console.info(`│${center(title, containerWidth)}│`);
  console.info(`├${hrX}┤`);
  content.forEach(text => console.info(text));
  console.info(`└${hrX}┘`);
}

function getLogLevelPrettyPrinted(coloredLogLevel: string) {
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

function createLogger(): WinstonLogger {
  addColors({
    error: "red",
    warn: "yellow",
    info: "cyan",
    debug: "green",
  });

  return winstonCreateLogger({
    format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.json()),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.printf(
            info => `[${info.timestamp}] ${getLogLevelPrettyPrinted(info.level)}: ${info.message}`,
          ),
        ),
      }),
    ],
  });
}

function createStream(logger: WinstonLogger): StreamOptions {
  return {
    write: (msg: string) => logger.info(msg.substring(0, msg.lastIndexOf("\n"))),
  };
}
