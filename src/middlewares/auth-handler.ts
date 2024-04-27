import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UserId } from "../lib/token-generator";
import { PrismaClient } from "@prisma/client";

class AuthHandler
{
  private prisma: PrismaClient;

  constructor(){
    this.prisma = new PrismaClient()

    this.authUser = this.authUser.bind(this);
    this.getUser = this.getUser.bind(this);
    this.authProducts = this.authProducts.bind(this);
  }

  private async getUser(authorization: string | undefined){
    
    if(!authorization){
      throw new BadRequestsException('Authentication failed.', ErrorCode.AUTHENTICATION_ERROR, 400);
    }

    const userId: number | null = await UserId(authorization);

    if(userId === null){
      throw new BadRequestsException('Authentication failed.', ErrorCode.AUTHENTICATION_ERROR, 400);
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: userId!
      }
    })

    if(!user){
      throw new BadRequestsException('Authentication failed.', ErrorCode.AUTHENTICATION_ERROR, 400);
    }

    return user;

  }

  public async authUser(req: Request, res: Response, next: NextFunction)
  {
    try{
      const user = await this.getUser(req.headers.authorization);
  
      if(user.role != 'USER'){
        throw new BadRequestsException('You are not authorised to perform this', ErrorCode.USER_NOT_ALLOWED, 401)
      }

      req.body.user = user; 
      
      next();
    }catch(error){
      next(error);
    }
  }

  public async authProducts(req: Request, res: Response, next: NextFunction)
  {
    try{
      const user = await this.getUser(req.headers.authorization);

      if(user.role != 'ADMIN'){
        throw new BadRequestsException('You are not authorised to perform this', ErrorCode.USER_NOT_ALLOWED, 401);
      }

      req.body.user = user;

      next();
    }catch(error){
      next(error);
    }
  }
}

export default AuthHandler;