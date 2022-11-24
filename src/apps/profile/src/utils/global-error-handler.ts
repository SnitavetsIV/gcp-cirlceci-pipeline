import { CustomError } from './response/CustomError';
import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    res.status(err.getError().httpStatusCode).json(err.getError());
  } else {
    res
      .status(500)
      .json(new CustomError(500, 'Internal Server Error', err).getError());
  }
};
