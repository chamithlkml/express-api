import { Request, Response, NextFunction } from 'express'
import { AddressSchema } from '../schemas/address-schema';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = {
      ...req.body,
      userId: req.body.user.id
    };
    const addressData = AddressSchema.parse(data);
    const createdAddress = await prisma.address.create({data: addressData});

    res.json(createdAddress);
  } catch (error) {
    next(error);
  }
};