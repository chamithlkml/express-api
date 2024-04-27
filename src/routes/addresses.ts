import { Router } from "express";
import AuthHandler from "../middlewares/auth-handler";
import { createAddress } from "../controllers/addresses";

const addressesRoutes: Router = Router();
const authHandler = new AuthHandler();

addressesRoutes.post('/', [authHandler.authUser], createAddress);
// addressesRoutes.get('/', [authHandler.authProducts], getProducts);
// addressesRoutes.put('/:id', [authHandler.authProducts], updateProduct);
// addressesRoutes.get('/:id', [authHandler.authProducts], getProduct);
// addressesRoutes.delete('/:id', [authHandler.authProducts], deleteProduct);

export default addressesRoutes;