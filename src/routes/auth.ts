import { Router, Request, Response } from 'express'
import { me, signin, signup } from '../controllers/auth'
import { AuthHandler } from '../middlewares/auth-handler';

const authRoutes: Router = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);
authRoutes.get('/me', AuthHandler, me);

export default authRoutes;