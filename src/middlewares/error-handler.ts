import { Request, Response, NextFunction } from 'express'
import logger from '../lib/logger';
import { ErrorCode, HttpException } from '../exceptions/root';
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client';

const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  logger.error(err);

  if(err instanceof ZodError){
    res.status(400).json({
      success: false,
      ErrorCode: ErrorCode.USER_INPUT_VALIDATION_FAILED,
      message: 'Unprecessable Entity',
      errors: err.issues
    })
  }else if(err instanceof HttpException){
    res.status(err.statusCode).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
      errors: [err.message]
    });
  }else if(err instanceof Prisma.PrismaClientKnownRequestError){
    res.status(400).json({
      success: false,
      errorCode: ErrorCode.INVALID_INPUT_PARAMETER,
      message: err.message,
      errors: [err.message]
    })
  }else{
    res.status(500).json({
      success: false,
      errorCode: ErrorCode.UNKNOWN_ERROR,
      message: err.message,
      errors: [err.message]
    });
  }
};

export default ErrorHandler;