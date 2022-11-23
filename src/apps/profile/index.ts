import { LoggingService } from '../../libs/logger-service/logging-service';

export const getProfile = (request: any, response: any) => {
  if (request && response) {
    LoggingService.Instance.info('Get Profile API Call');
  }
  return 'Get Profile!';
};
