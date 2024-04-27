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
    const productCount = await prisma.product.count();

    res.json({
      products: products,
      count: productCount,
      page: page,
      page_size: pageSize
    })
  } catch (error) {
    next(error)
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.params.id){
      throw new BadRequestsException('ID not found', ErrorCode.INVALID_INPUT_PARAMETER)
    }

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

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.params.id){
      throw new BadRequestsException('ID not found', ErrorCode.INVALID_INPUT_PARAMETER)
    }

    const productId: number = parseInt(req.params.id, 10);
    const foundProduct = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if(!foundProduct){
      throw new BadRequestsException('Product not found', ErrorCode.ITEM_NOT_FOUND, 400);
    }

    res.json(foundProduct);

  } catch (error) {
   next(error); 
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if(!req.params.id){
      throw new BadRequestsException('ID not found', ErrorCode.INVALID_INPUT_PARAMETER)
    }
    
    const productId: number = parseInt(req.params.id, 10);

    const deletedProduct = await prisma.product.delete({
      where: {
        id: productId
      }
    })

    res.json(deletedProduct);

  } catch (error) {
    next(error);
  }
};