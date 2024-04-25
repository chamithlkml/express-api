import { NextFunction, Request, Response } from "express";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UserId } from "../lib/token-generator";
import { Prisma, PrismaClient } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { string } from "zod";

const prisma = new PrismaClient()

export const AuthHandler = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const authToken = req.headers.authorization;

    if(!authToken){
      throw new BadRequestsException('Authentication failed', ErrorCode.AUTHENTICATION_ERROR, 400);
    }

    const userId: number | null = await UserId(authToken);

    if(userId === null){
      throw new BadRequestsException('Authentication failed', ErrorCode.AUTHENTICATION_ERROR, 400);
    }

    const user = await prisma.user.findFirst({
      where: {
        id: userId!
      }
    })

    if(!user){
      throw new BadRequestsException('Authentication failed', ErrorCode.AUTHENTICATION_ERROR, 400);
    }

    req.body.user = user;

    next();
  }catch(error){
    next(error);
  }
};