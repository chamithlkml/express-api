import { Request, Response } from 'express'

export const signup = (req: Request, res: Response) => {
  res.send('Route /api/auth/signup works')
};