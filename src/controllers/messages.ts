import { Request, Response, NextFunction } from 'express'
import { MessageSchema } from '../schemas/message-schema';
import { emailQueue, emailQueueName } from '../queues/email-queue';

export const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const messageData = MessageSchema.parse(req.body);
    await emailQueue.add(emailQueueName, messageData);

    res.json({});
  }catch(error){
    next(error);
  }
};