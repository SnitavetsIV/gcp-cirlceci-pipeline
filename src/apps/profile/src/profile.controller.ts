import { Request, Response, NextFunction } from 'express';
import Logger from './utils/logger';
import httpResponse from './utils/response/http-response';

const logger = new Logger({
  level: process.env.LOG_LEVEL || 3,
  namespace: 'API-Profile-Controller',
});

/**
 *
 * @param req
 * @param res
 * @returns
 */
export const getProfileHandler = (req: Request, res: Response) => {
  const { email } = req.query;
  const existingUserEmail = 'sample@gmail.com';

  logger.info('email', email);

  // uncomment for demo Error
  // syncErrorExample();

  if (email === existingUserEmail) {
    return httpResponse.success(email, res);
  }

  return httpResponse.notFound();
};

/**
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const createProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, fullName } = req.body;

  logger.info('email', email);
  logger.error('fullName', fullName);

  // uncomment for demo Error
  // await asyncErrorExample(next);

  return httpResponse.success(email, res);
};

const syncErrorExample = () => {
  throw new Error('I am an error in sync method for demonstration.');
};

const asyncErrorExample = async (next: NextFunction) => {
  // with express-async-errors package.
  throw new Error('I am an error in async method for demonstration.');

  // without express-async-errors package.
  // try {
  // } catch (error) {
  // next(error);
  // }
};
