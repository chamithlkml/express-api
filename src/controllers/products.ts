import { Request, Response, NextFunction } from 'express'

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try{
    console.log('create product');
    res.json({})
  }catch(error){
    next(error);
  }
};