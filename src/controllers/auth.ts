import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../secrets'
import { PrismaClient, Prisma } from '@prisma/client'
import { BadRequestsException } from '../exceptions/bad-requests'
import { ErrorCode } from '../exceptions/root'
import { UserToken } from '../lib/token-generator'
import { UserSchema, UserSignInSchema } from '../schemas/user-schema'

const prisma = new PrismaClient();
type UserResponse = { id: number, first_name: string, last_name: string, email: string, token?: string}

// POST /api/auth/signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const userInputs = UserSchema.parse(req.body);

    const foundUser = await prisma.user.findFirst({
      where: {
        email: userInputs.email
      }
    });

    if(foundUser){
      throw new BadRequestsException('User exists', ErrorCode.USER_ALREADY_EXISTS, 400)
    }

    const hash: string = await bcrypt.hash(userInputs.password, parseInt(SALT_ROUNDS || '10'))
    
    let user: Prisma.UserCreateInput = {
      firstName: userInputs.first_name,
      lastName: userInputs.last_name,
      email: userInputs.email,
      password: hash
    };

    const createdUser = await prisma.user.create({ data: user })

    const userResponse: UserResponse = {
      id: createdUser.id,
      first_name: createdUser.firstName,
      last_name: createdUser.lastName,
      email: createdUser.email,
      token: UserToken(createdUser.id)
    }

    res.send(userResponse)
  }catch(error){
    next(error)
  }
};

// POST /api/auth/signin
export const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userInputs = UserSignInSchema.parse(req.body)
    const foundUser = await prisma.user.findFirst({
      where: {
        email: userInputs.email
      }
    });

    if(!foundUser){
      throw new BadRequestsException('User not found', ErrorCode.USER_NOT_FOUND, 404);
    }

    const passwordMatches: boolean = await bcrypt.compare(userInputs.password, foundUser.password);

    if(!passwordMatches){
      throw new BadRequestsException('Password mismatch', ErrorCode.INCORRECT_PASSWORD, 400);
    }

    const userResponse: UserResponse = {
      id: foundUser.id,
      first_name: foundUser.firstName,
      last_name: foundUser.lastName,
      email: foundUser.email,
      token: UserToken(foundUser.id)
    }

    res.send(userResponse);

  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
export const me = (req: Request, res: Response, next: NextFunction) => {
  try{
    const userObj = req.body.user;

    const sessionUser = {
      id: userObj.id,
      first_name: userObj.firstName,
      last_name: userObj.lastName,
      email: userObj.email
    } 

    res.send(sessionUser);
  }catch(error){
    next(error)
  }
}