import { Request, Response } from 'express';
import { UserService } from '../services/User.service';

const userService = new UserService();

export class UserController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
  }

  async findByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await userService.findByEmail(email as string);
      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { email, name, password } = req.body;
      if (!email || !name || !password) {
        res.status(400).json({ error: 'Email, nome e senha são obrigatórios' });
        return;
      }
      const user = await userService.createUser({ email, name, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await userService.updateUser(Number(id), data);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await userService.deleteUser(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  }
}

export const userController = new UserController();
