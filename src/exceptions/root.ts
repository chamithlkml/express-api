export class HttpException extends Error
{
  public message: string;
  public errorCode: any;
  public statusCode: ErrorCode;
  public errors: any;

  constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any){
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export enum ErrorCode {
  USER_NOT_FOUND = 1001,
  USER_ALREADY_EXISTS = 1002,
  INCORRECT_PASSWORD = 1003,
  USER_INPUT_VALIDATION_FAILED = 1004,
  UNKNOWN_ERROR = 1005,
  AUTHENTICATION_ERROR = 1006
}
