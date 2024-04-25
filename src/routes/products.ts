import { Router } from "express";
import { createProduct } from "../controllers/products";

const productsRoutes: Router = Router();

productsRoutes.post('/', createProduct)
//productsRoutes.get('/', getProducts)
// productsRoutes.put('/:id', updateProduct)
// productsRoutes.get('/:id', getProduct)
// productsRoutes.delete('/:id', deleteProduct)

export default productsRoutes;