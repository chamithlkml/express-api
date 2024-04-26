import { Router } from "express";
import { createProduct, getProduct, getProducts, updateProduct } from "../controllers/products";
import AuthHandler from "../middlewares/auth-handler";

const productsRoutes: Router = Router();
const authHandler = new AuthHandler();

productsRoutes.post('/', authHandler.authProducts, createProduct);
productsRoutes.get('/', authHandler.authProducts, getProducts);
productsRoutes.put('/:id', authHandler.authProducts, updateProduct);
productsRoutes.get('/:id', authHandler.authProducts, getProduct);
// productsRoutes.delete('/:id', deleteProduct)

export default productsRoutes;