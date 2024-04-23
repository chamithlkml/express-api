import { ErrorCode, HttpException } from "./root";

export class BadRequestsException extends HttpException
{
  constructor(message: string, errorCode: ErrorCode, statusCode: number = 400){
    super(message, errorCode, statusCode, null);
  }
}