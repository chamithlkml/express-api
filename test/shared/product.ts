import { PrismaClient } from '@prisma/client'
import { BadRequestsException } from '../../src/exceptions/bad-requests';
import { ErrorCode } from '../../src/exceptions/root';

const prisma = new PrismaClient();

export const LastProductId = async () => {
  const lastProduct = await prisma.product.findFirst({
    orderBy: {
      id: 'desc'
    }
  })

  if(!lastProduct){
    throw new BadRequestsException('Product not found', ErrorCode.ITEM_NOT_FOUND, 400);
  }

  return lastProduct.id;
}