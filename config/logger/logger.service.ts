import { LoggerService as LS } from '@nestjs/common';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import * as moment from 'moment';

const { errors, combine, json, timestamp, ms, prettyPrint } = winston.format;

export class LoggerService implements LS {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: combine(
        errors({ stack: true }),
        json(),
        timestamp({ format: 'isoDateTime' }),
        ms(),
        prettyPrint(),
      ),
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `${process.env.NODE_ENV}-error-${moment(new Date()).format('YYYY-MM-DD')}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
        new winston.transports.Console({
          level: 'debug',
          format: combine(nestWinstonModuleUtilities.format.nestLike()),
        }),

        new winston.transports.File({
          filename: `${process.env.NODE_ENV}-application-${moment(
            new Date(),
            'YYYY-MM-DD',
          )}.log`,
          dirname: 'logs',
          maxsize: 5000000,
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }

  warn(message: string) {
    this.logger.warning(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
