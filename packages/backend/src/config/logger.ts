import { getDirname } from "cross-dirname";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";

import { VAR_ZOD_ENVIRONMENT } from "@internal";

const logDir: string = join(getDirname(), VAR_ZOD_ENVIRONMENT.LOG_DIR);

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat,
  ),
  transports: [
    // debug log setting
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/debug", // log file /logs/debug/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      json: false,
      zippedArchive: true,
    }),
    // error log setting
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error", // log file /logs/error/*.log in save
      filename: `%DATE%.log`,
      maxFiles: 30, // 30 Days saved
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
  }),
);

const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};

type StartupLogProps = {
  title: string;
  data: Record<string, string>;
  padding?: number;
  kvSeparator?: string;
};

function startupLog({ title, data, kvSeparator = " : ", padding = 2 }: StartupLogProps) {
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

  logger.info(`┌${hrX}┐`);
  logger.info(`│${center(title, containerWidth)}│`);
  logger.info(`├${hrX}┤`);
  content.forEach(text => logger.info(text));
  logger.info(`└${hrX}┘`);
}

export { StartupLogProps, logger, startupLog, stream };
