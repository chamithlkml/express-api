import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from '../secrets';

export const UserToken = (userId: number) => {
  return jwt.sign({ userId: userId }, JWT_SECRET)
};

export const UserId = async (token: string) => {
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = typeof decoded === 'string' ? null : decoded.userId;

    return userId;
  }catch(error){
    throw new Error('Authentication error');
  }
};