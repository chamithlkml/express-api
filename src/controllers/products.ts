import { Request, Response, NextFunction } from 'express'
import { ProductSchema, UpdateProductSchema } from '../schemas/product-schema';
import { PrismaClient } from '@prisma/client';
import { PAGE_SIZE } from '../secrets';
import { BadRequestsException } from '../exceptions/bad-requests';
import { ErrorCode } from '../exceptions/root';

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

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    const productUpdateData = UpdateProductSchema.parse(req.body);

    const updatedProduct = await prisma.product.update({
      where: {
        id: productId
      },
      data: productUpdateData
    })

    res.json(updatedProduct);
  } catch (error) {
    next(error)
  }
};