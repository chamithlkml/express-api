import { Request, Response, NextFunction } from 'express'
import logger from '../lib/logger';
import { HttpException } from '../exceptions/root';

const ErrorHandler = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  logger.error(err);

  res.status(err.statusCode).json({
    success: false,
    errorCode: err.errorCode,
    message: err.message
  });
};

export default ErrorHandler;