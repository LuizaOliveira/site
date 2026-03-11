import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/Auth.service';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
    name: string;
  };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    res.status(401).json({ error: 'Token mal formatado' });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ error: 'Token mal formatado' });
    return;
  }

  const decoded = authService.verifyToken(token);

  if (!decoded) {
    res.status(401).json({ error: 'Token inválido ou expirado' });
    return;
  }

  req.user = {
    id: decoded.id,
    email: decoded.email,
    name: decoded.name,
  };

  next();
};
