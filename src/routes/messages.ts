import { Router } from 'express'
import AuthHandler from '../middlewares/auth-handler';
import { createMessage } from '../controllers/messages';

const messageRoutes: Router = Router();
const authHandler = new AuthHandler();

messageRoutes.post('/', [authHandler.authUser], createMessage);

export default messageRoutes;