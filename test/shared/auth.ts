import { PrismaClient, Prisma } from '@prisma/client'
import { UserToken } from '../../src/lib/token-generator';
import { UserSchema } from '../../src/schemas/user-schema';

export const AuthAdminContext = async (): Promise<string> => {
  const prisma = new PrismaClient();
  const adminUser = await prisma.user.findFirst({
    where: {
      role: 'ADMIN'
    }
  });

  if(!adminUser){
    throw new Error('No Admin user found')
  }

  return UserToken(adminUser.id)
}