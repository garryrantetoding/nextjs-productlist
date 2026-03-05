// utils/auth.ts
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the token

export interface DecodedToken {
  id: string;
  email: string;
  name: string;
  roles: string; // or 'role', depending on your backend
  iat: number;
  exp: number;
}

export const getUserFromToken = (token: string): DecodedToken | null => {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (err) {
    console.error('Invalid token');
    return null;
  }
};
