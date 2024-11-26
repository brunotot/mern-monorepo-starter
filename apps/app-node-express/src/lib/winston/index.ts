/**
 * @packageDocumentation
 *
 * ## Overview
 * This module sets up a customized logger using the `winston` library, providing color-coded log levels and timestamped messages.
 * The logger is designed to format log output in a structured and readable way, suitable for both development and production environments.
 *
 * ## Features
 * - Color-coded log levels (error, warn, info, debug)
 * - Timestamped log entries in the format `YYYY-MM-DD HH:mm:ss`
 * - Pretty-printed log level alignment for consistent readability
 * - JSON output format for structured logging
 * - Logs to the console by default with customizable transports
 *
 * ## How to Use
 * ```ts
 * import { log } from "@/logger";
 *
 * log.error('This is an error message');
 * log.warn('This is a warning message');
 * log.info('This is an informational message');
 * log.debug('This is a debug message');
 * ```
 */

/* eslint-disable no-console */

import type { StreamOptions } from "morgan";
import * as Winston from "winston";

export type WinstonLogger = Winston.Logger;

const TIMESTAMP_FORMAT = "YYYY-MM-DD HH:mm:ss";

const LOGGER_COLORS: Winston.config.AbstractConfigSetColors = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
};

export const log = createLogger();

export function createStream(logger: WinstonLogger): StreamOptions {
  return {
    write: (msg: string) => logger.info(msg.substring(0, msg.lastIndexOf("\n"))),
  };
}

/**
 *
 * An example output might be:
 *
 * ```
 * ┌──────────────────────────────────────┐
 * │   [Express] app-node-express v0.0.1  │
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
export function logBanner(props: { title: string; data: Record<string, string> }) {
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

  const content = Object.entries(data).map(([key, value]) => {
    const keyPadding = " ".repeat(maxKeyLength - key.length);
    const text = `${key}${keyPadding}${hrY}${value}`;
    const remainder = " ".repeat(containerWidth - text.length - spacer.length * 2);
    return `│${spacer}${text}${remainder}${spacer}│`;
  });

  const hrX = `${"─".repeat(containerWidth)}`;
  console.info(`┌${hrX}┐`);
  console.info(`│${center(title, containerWidth)}│`);
  console.info(`├${hrX}┤`);
  content.forEach(text => console.info(text));
  console.info(`└${hrX}┘`);
}

function createLogger(): WinstonLogger {
  Winston.addColors(LOGGER_COLORS);

  return Winston.createLogger({
    format: Winston.format.combine(
      Winston.format.timestamp({ format: TIMESTAMP_FORMAT }),
      Winston.format.json(),
    ),
    transports: [
      new Winston.transports.Console({
        format: Winston.format.combine(
          Winston.format.colorize(),
          Winston.format.printf(buildMessage),
        ),
      }),
    ],
  });
}

function buildMessage(info: Winston.Logform.TransformableInfo): string {
  const getLogLevelPrettyPrinted = (coloredLogLevel: string) => {
    const AVAILABLE_LOG_LEVELS = ["error", "warn", "info", "debug"];
    const COLORED_LOG_OFFSET = 10;
    const longestChar = AVAILABLE_LOG_LEVELS.reduce((acc, lvl) => Math.max(acc, lvl.length), 0);
    const longestCharSanitized = coloredLogLevel.length - COLORED_LOG_OFFSET;
    const diff = longestChar - longestCharSanitized;
    const repeat = diff > 0 ? diff : 0;
    return " ".repeat(repeat) + coloredLogLevel;
  };

  return `[${info.timestamp}] ${getLogLevelPrettyPrinted(info.level)}: ${info.message}`;
}
