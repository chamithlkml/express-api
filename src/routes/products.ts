import { Router } from "express";
import { createProduct } from "../controllers/products";
import AuthHandler from "../middlewares/auth-handler";

const productsRoutes: Router = Router();
const authHandler = new AuthHandler();

productsRoutes.post('/', authHandler.authProducts, createProduct);
//productsRoutes.get('/', getProducts)
// productsRoutes.put('/:id', updateProduct)
// productsRoutes.get('/:id', getProduct)
// productsRoutes.delete('/:id', deleteProduct)

export default productsRoutes;