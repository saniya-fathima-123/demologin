import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { type UserDocument } from '../models/User';

export const SECRET_KEY = 'OxiUL#I*^KAO!*10A';

// Define a custom type for the extended Request object
interface AuthenticatedRequest extends Request {
  user?: UserDocument;
}

// Middleware to verify JWT and authenticate
export const authenticateJWT = () => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.Authorization?.toString().split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded: UserDocument) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      // If token is valid, add decoded user info to request object
      req.user = decoded; // Example: req.user = { userId: decoded.userId, role: decoded.role }
      next();
    });
  };
};
