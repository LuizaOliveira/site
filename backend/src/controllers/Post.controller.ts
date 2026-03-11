import { Request, Response } from 'express';
import { PostService } from '../services/Post.service';

const postService = new PostService();

export class PostController {
  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const posts = await postService.findAll();
      res.json({ data: posts });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar posts' });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const post = await postService.findById(Number(id));
      if (!post) {
        res.status(404).json({ error: 'Post não encontrado' });
        return;
      }
      res.json({ data: post });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar post' });
    }
  }

  async findPublished(req: Request, res: Response): Promise<void> {
    try {
      const posts = await postService.findPublished();
      res.json({ data: posts });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar posts publicados' });
    }
  }

  // Agora o create espera que thumbnail, file, newsImage e description já sejam enviadas
  // via JSON pelo frontend (URLs do Cloudinary e texto)
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { title, thumbnail, file, newsImage, description, published } = req.body;

      if (!title || !thumbnail || !file || !newsImage || !description) {
        res.status(400).json({ error: 'Campos obrigatórios: title, thumbnail, file, newsImage e description' });
        return;
      }

      const post = await postService.create({
        title,
        thumbnail,
        file,
        newsImage,
        description,
        published: published === 'true' || published === true,
      });

      res.status(201).json({ data: post });
    } catch (error) {
      console.error('Erro ao criar post:', error);
      res.status(500).json({ error: 'Erro ao criar post' });
    }
  }

  // Atualização trabalha com URLs e texto já prontos
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { title, thumbnail, file, newsImage, description, published } = req.body;

      const updateData: {
        title?: string;
        thumbnail?: string;
        file?: string;
        newsImage?: string;
        description?: string;
        published?: boolean;
      } = {};

      if (title) updateData.title = title;
      if (thumbnail) updateData.thumbnail = thumbnail;
      if (file) updateData.file = file;
      if (newsImage) updateData.newsImage = newsImage;
      if (description) updateData.description = description;
      if (published !== undefined) {
        updateData.published = published === 'true' || published === true;
      }

      const post = await postService.update(Number(id), updateData);
      res.json({ data: post });
    } catch (error) {
      console.error('Erro ao atualizar post:', error);
      res.status(500).json({ error: 'Erro ao atualizar post' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await postService.delete(Number(id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar post' });
    }
  }

  async publish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const post = await postService.publish(Number(id));
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao publicar post' });
    }
  }

  async unpublish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const post = await postService.unpublish(Number(id));
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao despublicar post' });
    }
  }
}

export const postController = new PostController();
