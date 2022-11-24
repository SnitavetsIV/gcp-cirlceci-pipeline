import Logger from '../logger';
import { ErrorType } from './types';

const logger = new Logger({
  level: process.env.LOG_LEVEL || 3,
  namespace: 'Custom-Error',
});

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorType: ErrorType;
  private errors: any;

  /**
   *
   * @param httpStatusCode
   * @param message
   */
  constructor(httpStatusCode: number, message: string | { [key: string]: any });

  /**
   *
   * @param httpStatusCode
   * @param errorType
   * @param error
   */
  constructor(httpStatusCode: number, errorType: ErrorType, error: Error);

  /**
   *
   * @param httpStatusCode
   * @param errorType
   * @param message
   * @param errors
   */
  constructor(
    httpStatusCode: number,
    errorType: ErrorType,
    message: string,
    errors: any
  );
  constructor(...props: any[]) {
    if (props.length === 2) {
      super(props[1]);
      this.httpStatusCode = props[0];
      this.errorType = props[1];
    } else if (props.length === 3) {
      super(props[2]);
      this.httpStatusCode = props[0];
      this.errorType = props[1];
    } else {
      super(props[2]);
      this.httpStatusCode = props[0];
      this.errorType = props[1];
      this.errors = props[3];
    }
  }

  /**
   *
   * @returns
   */
  getError() {
    logger.debug(this.stack);
    return {
      httpStatusCode: this.httpStatusCode,
      errorType: this.errorType,
      errors: this.errors,
      errorMessage: this.message,
      // stack: this.stack,
    };
  }
}
