import { getDirname } from "cross-dirname";
import { existsSync, mkdirSync } from "fs";
import type { StreamOptions } from "morgan";
import { join } from "path";
import winston from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { Environment } from "@org/backend/config/singletons/Environment";

export class Logger {
  private static instance: Logger;

  public static getInstance(): Logger {
    Logger.instance ??= new Logger();
    return Logger.instance;
  }

  readonly logger: winston.Logger;
  readonly stream: StreamOptions;

  private constructor() {
    this.logger = this.#createLogger();
    this.stream = this.#createStream();
  }

  public table(props: {
    title: string;
    data: Record<string, string>;
    padding?: number;
    kvSeparator?: string;
  }) {
    const title = props.title;
    const data = props.data;
    const kvSeparator = props.kvSeparator ?? " : ";
    const padding = props.padding ?? 2;

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

    this.logger.info(`┌${hrX}┐`);
    this.logger.info(`│${center(title, containerWidth)}│`);
    this.logger.info(`├${hrX}┤`);
    content.forEach(text => this.logger.info(text));
    this.logger.info(`└${hrX}┘`);
  }

  #createStream(): StreamOptions {
    return {
      write: (msg: string) => this.logger.info(msg.substring(0, msg.lastIndexOf("\n"))),
    };
  }

  #createLogger(): winston.Logger {
    const logDir: string = join(getDirname(), Environment.getInstance().vars.LOG_DIR);
    if (!existsSync(logDir)) mkdirSync(logDir);
    const logFormat = winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
    );

    const logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat,
      ),
      transports: [
        new winstonDaily({
          level: "debug",
          datePattern: "YYYY-MM-DD",
          dirname: logDir + "/debug",
          filename: `%DATE%.log`,
          maxFiles: 30,
          json: false,
          zippedArchive: true,
        }),
        new winstonDaily({
          level: "error",
          datePattern: "YYYY-MM-DD",
          dirname: logDir + "/error",
          filename: `%DATE%.log`,
          maxFiles: 30,
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

    return logger;
  }
}
