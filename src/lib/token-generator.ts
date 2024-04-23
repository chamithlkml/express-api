import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets';

export const UserToken = (userId: number) => {
  return jwt.sign({ userId: userId }, JWT_SECRET);
};

export const DecodeToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};