import { Request, Response, NextFunction } from 'express'
import { ProductSchema } from '../schemas/product-schema';
import { PrismaClient } from '@prisma/client';
import { PAGE_SIZE } from '../secrets';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const productInputs = ProductSchema.parse(req.body);
    const createdProduct = await prisma.product.create({data: productInputs })

    res.json(createdProduct)
  }catch(error){
    next(error);
  }
};

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt((req.query.page ?? '1').toString(), 10);
    const pageSize = parseInt(PAGE_SIZE, 10);
    const products = await prisma.product.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize
    });

    res.json({
      products: products,
      page: page,
      page_size: pageSize
    })
  } catch (error) {
    next(error)
  }
};