import { Router } from "express";
import AuthHandler from "../middlewares/auth-handler";
import { createAddress } from "../controllers/addresses";

const addressesRoutes: Router = Router();
const authHandler = new AuthHandler();

addressesRoutes.post('/', [authHandler.authUser], createAddress);

export default addressesRoutes;