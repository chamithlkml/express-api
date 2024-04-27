import { Router } from 'express'
import authRoutes from './auth'
import productsRoutes from './products';
import addressesRoutes from './addresses';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);
rootRouter.use('/addresses', addressesRoutes);

export default rootRouter;