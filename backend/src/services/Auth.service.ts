import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { UserService } from './User.service';

const userService = new UserService();

const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-aqui';
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || '1d') as SignOptions['expiresIn'];

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  verifyToken(token: string): jwt.JwtPayload | null {
    try {
      return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    } catch {
      return null;
    }
  }

  async login(email: string, password: string): Promise<{ user: Omit<User, 'password'>; token: string } | null> {
    const user = await userService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValidPassword = await this.comparePassword(password, user.password);
    if (!isValidPassword) {
      console.log('Senha inválida para email:', email, password + ' vs ', user);
      return null;
    }

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  async register(data: { email: string; name: string; password: string }): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const hashedPassword = await this.hashPassword(data.password);
    const user = await userService.createUser({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}

export const authService = new AuthService();
