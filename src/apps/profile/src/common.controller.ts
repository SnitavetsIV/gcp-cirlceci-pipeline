import { Request, Response } from 'express';
import Logger from './utils/logger';
import httpResponse from './utils/response/http-response';

const logger = new Logger({
  level: process.env.LOG_LEVEL || 3,
  namespace: 'API-Common-Controller',
});

/**
 *
 * @param req
 * @param res
 */
export const rootHandler = async (req: Request, res: Response) => {
  logger.info('API: Root Handler Invoked.');
  return httpResponse.success('Rest API Works!', res);
};

/**
 *
 * @param req
 * @param res
 */
export const urlNotFoundHandler = async (req: Request, res: Response) => {
  logger.info('API: URL Not Found Handler Invoked.');
  return httpResponse.success('404 Not Found!', res);
};
