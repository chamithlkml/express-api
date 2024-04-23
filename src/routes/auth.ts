import { Router, Request, Response } from 'express'
import { signin, signup } from '../controllers/auth'

const authRoutes: Router = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/signin', signin);

export default authRoutes;