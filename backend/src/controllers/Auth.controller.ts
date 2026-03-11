import { Request, Response } from 'express';
import { authService } from '../services/Auth.service';
import { UserService } from '../services/User.service';

const userService = new UserService();

export class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: 'Email e senha são obrigatórios' });
        return;
      }

      const result = await authService.login(email, password);

      if (!result) {
        res.status(401).json({ error: 'Email ou senha inválidos' });
        return;
      }

      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password } = req.body;

      if (!email || !name || !password) {
        res.status(400).json({ error: 'Email, nome e senha são obrigatórios' });
        return;
      }

      const existingUser = await userService.findByEmail(email);
      if (existingUser) {
        res.status(400).json({ error: 'Email já cadastrado' });
        return;
      }

      const result = await authService.register({ email, name, password });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  }

  async me(req: Request, res: Response): Promise<void> {
    try {
      const user = (req as any).user;
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }
}

export const authController = new AuthController();
