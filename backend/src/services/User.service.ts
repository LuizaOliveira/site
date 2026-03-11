import { User } from '@prisma/client';
import prisma from '../lib/prisma';

export class UserService {
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: { email: string; name: string; password: string }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async updateUser(id: number, data: Partial<{ email: string; name: string; password: string }>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
  
  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}