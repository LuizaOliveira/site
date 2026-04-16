import { Article } from '@prisma/client';
import prisma from '../lib/prisma';

interface CreateArticleData {
  published: boolean;
  thumbnail: string;
  title: string;
  author: string;
  articleImage: string;
  articleFile: string;
  description: string;
  content: string;
  tags?: string[];
}

interface UpdateArticleData {
  published?: boolean;
  thumbnail?: string;
  title?: string;
  author?: string;
  articleImage?: string;
  description?: string;
  content?: string;
  tags?: string[];
}

export class ArticleService {
  async findAll() {
    return prisma.article.findMany({
      include: { tags: true },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findById(id: number) {
    return prisma.article.findUnique({
      where: { id },
      include: { tags: true }
    });
  }
  
  async findByAuthor(author: string) {
    return prisma.article.findMany({
      where: { author },
      include: { tags: true },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async findByTag(tagName: string) {
    return prisma.article.findMany({
      where: {
        tags: {
          some: {
            name: tagName
          }
        }
      },
      include: { tags: true },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  private validateTags(tags?: string[]): string[] {
    if (!tags) return [];
    
    const uniqueTags = Array.from(new Set(tags.map(t => t.trim().toLowerCase())));
    
    if (uniqueTags.length > 3) {
      throw new Error('Um artigo pode ter no máximo 3 tags');
    }
    
    return uniqueTags;
  }

  async create(data: CreateArticleData) {
    const validTags = this.validateTags(data.tags);

    return prisma.article.create({
      data: {
        published: data.published,
        thumbnail: data.thumbnail,
        title: data.title,
        author: data.author,
        articleImage: data.articleImage,
        articleFile: data.articleFile,
        description: data.description,
        content: data.content,
        tags: validTags.length > 0 ? {
          connectOrCreate: validTags.map(tagName => ({
            where: { name: tagName },
            create: { name: tagName }
          }))
        } : undefined
      },
      include: { tags: true }
    });
  }

  async update(id: number, data: UpdateArticleData) {
    const updateData: any = {};

    if (data.published !== undefined) updateData.published = data.published;
    if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.articleImage !== undefined) updateData.articleImage = data.articleImage;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.content !== undefined) updateData.content = data.content;

    if (data.tags !== undefined) {
      const validTags = this.validateTags(data.tags);
      
      // Desconectar todas as tags atuais
      updateData.tags = {
        set: []
      };

      // Se houver tags válidas, reconectar
      if (validTags.length > 0) {
        updateData.tags = {
          connectOrCreate: validTags.map(tagName => ({
            where: { name: tagName },
            create: { name: tagName }
          }))
        };
      }
    }

    return prisma.article.update({
      where: { id },
      data: updateData,
      include: { tags: true }
    });
  }

  async delete(id: number) {
    return prisma.article.delete({
      where: { id },
      include: { tags: true }
    });
  }

  async publish(id: number) {
    return prisma.article.update({
      where: { id },
      data: { published: true },
      include: { tags: true }
    });
  }

  async unpublish(id: number) {
    return prisma.article.update({
      where: { id },
      data: { published: false },
      include: { tags: true }
    });
  }
}

export const articleService = new ArticleService();