import { EMPTY, FORMAT_DATE } from "./../util/constans";
import { Injectable, Logger, LoggerService } from "@nestjs/common";
import moment from "moment";

@Injectable()
export class CustomLoggerService implements LoggerService {
  logger = new Logger();

  log(description: string, message: any) {
    this.logger.log(`${description} -> ${this.manageEmpty(message)}`);
  }

  error(description: string, message: any) {
    this.logger.error(`${description} -> ${this.manageEmpty(message)}`);
  }

  warn(description: string, message: any) {
    this.logger.warn(`${description} -> ${this.manageEmpty(message)}`);
  }

  debug?(description: string, message: any) {
    this.logger.debug(`${description} -> ${this.manageEmpty(message)}`);
  }

  verbose?(description: string, message: any) {
    this.logger.verbose(`${description} -> ${this.manageEmpty(message)}`);
  }

  request?(from: string, request: any) {
    this.logger.verbose(
      `Request - ${from} - ${moment().format(FORMAT_DATE)} -> ${JSON.stringify(
        request
      )}`
    );
  }

  response?(from: string, request: any) {
    this.logger.verbose(
      `Response - ${from} - ${moment().format(FORMAT_DATE)} -> ${JSON.stringify(
        request
      )}`
    );
  }

  private manageEmpty(value) {
    return value ? JSON.stringify(value) : EMPTY;
  }
}
