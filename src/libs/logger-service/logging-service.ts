import * as winston from 'winston';
import { createLogger, transports, format } from 'winston';

export class LoggingService {
  logger: winston.Logger;

  static get Instance() {
    return new LoggingService();
  }

  constructor() {
    this.logger = createLogger({
      transports: [new transports.Console()],
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    });
  }

  emerg(message: string) {
    this.logger.emerg(message);
  }

  alert(message: string) {
    this.logger.alert(message);
  }

  crit(message: string) {
    this.logger.crit(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  warning(message: string) {
    this.logger.warning(message);
  }

  notice(message: string) {
    this.logger.notice(message);
  }

  info(message: string, object?: any) {
    this.logger.info(message, object);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}
