// utils/getUserFromRequest.ts
import cookie from 'cookie';
import { getUserFromToken } from './auth';

export const getUserFromRequest = (req: any) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.accessToken;

  if (!token) return null;

  return getUserFromToken(token); // your jwt-decode logic
};
