import { Router } from 'express'
import { me, signin, signup } from '../controllers/auth'
import AuthHandler  from '../middlewares/auth-handler';

const authRoutes: Router = Router();
const authHandler = new AuthHandler();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.get('/me', authHandler.authUser, me);

export default authRoutes;