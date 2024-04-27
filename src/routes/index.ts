import { Router } from 'express'
import authRoutes from './auth'
import productsRoutes from './products';
import addressesRoutes from './addresses';
import messageRoutes from './messages';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRoutes);
rootRouter.use('/products', productsRoutes);
rootRouter.use('/addresses', addressesRoutes);
rootRouter.use('/messages', messageRoutes);

export default rootRouter;