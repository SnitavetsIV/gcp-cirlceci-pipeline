const logger = {
  emerg: jest.fn(),
  alert: jest.fn(),
  crit: jest.fn(),
  error: jest.fn(),
  warning: jest.fn(),
  notice: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

jest.mock('winston', () => ({
  format: {
    colorize: jest.fn(),
    combine: jest.fn(),
    label: jest.fn(),
    timestamp: jest.fn(),
    printf: jest.fn(),
  },
  createLogger: jest.fn().mockReturnValue(logger),
  transports: {
    Console: jest.fn(),
  },
}));

// IMPORTANT import the mock after
import * as winston from 'winston';
import { LoggingService } from '../../../../src/libs/logger-service/logging-service';

describe('-- Logging Service --', () => {
  test('testing logger log function called...', () => {
    const mockCreateLogger = jest.spyOn(winston, 'createLogger');
    const loggingService: LoggingService = LoggingService.Instance;

    expect(loggingService).toBeInstanceOf(LoggingService);
    expect(loggingService).toBeDefined();
    expect(mockCreateLogger).toHaveBeenCalled();

    // spy on the winston.Logger instance within this test and check
    // that it is called - this is working from within the test method
    logger.info('debug', 'test log debug');
    expect(logger.info).toHaveBeenCalled();

    // now try and invoke the logger instance indirectly through the service class
    // check that loggerMock is called a second time - this fails, only called once
    // from the preceding lines in this test
    loggingService.emerg('debug message');
    loggingService.alert('debug message');
    loggingService.crit('debug message');
    loggingService.error('debug message');
    loggingService.warning('debug message');
    loggingService.notice('debug message');
    loggingService.info('debug message');
    loggingService.debug('debug message');

    expect(logger.emerg).toHaveBeenCalledTimes(1);
    expect(logger.alert).toHaveBeenCalledTimes(1);
    expect(logger.crit).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.warning).toHaveBeenCalledTimes(1);
    expect(logger.notice).toHaveBeenCalledTimes(1);
    expect(logger.info).toHaveBeenCalledTimes(2);
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });
});
