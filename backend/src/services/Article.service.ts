import { Article } from '@prisma/client';
import prisma from '../lib/prisma';

export class ArticleService {
  async findAll(): Promise<Article[]> {
    return prisma.article.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id: number): Promise<Article | null> {
    return prisma.article.findUnique({
      where: { id },
    });
  }
  
  async findByAuthor(author: string): Promise<Article[]> {
    return prisma.article.findMany({
      where: { author },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async create(data: {
    published: boolean;
    thumbnail: string;
    title: string;
    author: string;
    articleImage: string;
    articleFile: string;
    description: string;
    content: string;
  }): Promise<Article> {
    return prisma.article.create({
      data
    });
  }

  async update(
    id: number,
    data: {
      published?: boolean;
      thumbnail?: string;
      title?: string;
      author?: string;
      articleImage?: string;
      description?: string;
      content?: string;
    }
  ): Promise<Article> {
    return prisma.article.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Article> {
    return prisma.article.delete({
      where: { id },
    });
  }

  async publish(id: number): Promise<Article> {
    return prisma.article.update({
      where: { id },
      data: { published: true },
    });
  }

  async unpublish(id: number): Promise<Article> {
    return prisma.article.update({
      where: { id },
      data: { published: false },
    });
  }
}

export const articleService = new ArticleService();