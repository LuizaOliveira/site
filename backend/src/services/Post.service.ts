import { Post } from '@prisma/client';
import prisma from '../lib/prisma';

export class PostService {
  async findAll(): Promise<Post[]> {
    return prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id: number): Promise<Post | null> {
    return prisma.post.findUnique({
      where: { id },
    });
  }

  async findPublished(): Promise<Post[]> {
    return prisma.post.findMany({
      where: { published: true },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async create(data: {
    title: string;
    file: string;
    thumbnail: string;
    newsImage: string;
    description: string;
    published?: boolean;
  }): Promise<Post> {
    return prisma.post.create({
      data,
    });
  }

  async update(
    id: number,
    data: {
      title?: string;
      file?: string;
      thumbnail?: string;
      newsImage?: string;
      description?: string;
      published?: boolean;
    }
  ): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Post> {
    return prisma.post.delete({
      where: { id },
    });
  }

  async publish(id: number): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data: { published: true },
    });
  }

  async unpublish(id: number): Promise<Post> {
    return prisma.post.update({
      where: { id },
      data: { published: false },
    });
  }
}

export const postService = new PostService();
