import { PrismaClient } from '@prisma/client'
import { UserToken } from '../../src/lib/token-generator';

export const AuthContext = async (role: 'ADMIN' | 'USER'): Promise<string> => {
  const prisma = new PrismaClient();
  const foundUser = await prisma.user.findFirst({
    where: {
      role: role
    }
  });

  if(!foundUser){
    throw new Error(`User of type ${role} not found`)
  }

  return UserToken(foundUser.id);
}