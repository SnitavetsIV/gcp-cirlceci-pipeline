import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { CustomError } from '../response/CustomError';

export const validator =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      console.log(typeof error);
      return res
        .status(400)
        .json(
          new CustomError(
            400,
            'Bad Request',
            'Input validation error',
            error
          ).getError()
        );
    }
  };
