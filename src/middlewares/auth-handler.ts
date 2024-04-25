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
  }

  private async getUser(authorization: string | undefined){
    
    if(!authorization){
      throw new BadRequestsException('Authention failed.', ErrorCode.AUTHENTICATION_ERROR, 400);
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
      const user = await this.getUser(req.headers.authorization)
  
      if(!user){
        throw new BadRequestsException('Authentication failed.', ErrorCode.AUTHENTICATION_ERROR, 400);
      }

      req.body.user = user;
  
      next();
    }catch(error){
      next(error);
    }
  }
}

export default AuthHandler;