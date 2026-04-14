import { Request, Response } from 'express';
import { ArticleService } from '../services/Article.service';

const articleService = new ArticleService();

export class ArticleController {
	async findAll(req: Request, res: Response): Promise<void> {
		try {
			const articles = await articleService.findAll();
			res.json({ data: articles });
		} catch (error) {
			res.status(500).json({ error: 'Erro ao buscar artigos' });
		}
	}

	async findById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const article = await articleService.findById(Number(id));

			if (!article) {
				res.status(404).json({ error: 'Artigo não encontrado' });
				return;
			}

			res.json({ data: article });
		} catch (error) {
			res.status(500).json({ error: 'Erro ao buscar artigo' });
		}
	}

	async findByAuthor(req: Request, res: Response): Promise<void> {
		try {
			const { author } = req.body;
			const normalizedAuthor = Array.isArray(author) ? author[0] : author;

			if (!normalizedAuthor) {
				res.status(400).json({ error: 'Parâmetro author é obrigatório' });
				return;
			}

			const articles = await articleService.findByAuthor(normalizedAuthor);
			res.json({ data: articles });
		} catch (error) {
			res.status(500).json({ error: 'Erro ao buscar artigos por autor' });
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const { title, thumbnail, author, articleImage, description, content, published } = req.body;

			if (!title || !thumbnail || !author || !articleImage || !description || !content) {
				res.status(400).json({
					error:
						'Campos obrigatórios: title, thumbnail, author, articleImage, description e content',
				});
				return;
			}

			const article = await articleService.create({
				title,
				thumbnail,
				author,
				articleImage,
				articleFile: '',
				description,
				content,
				published: published === 'true' || published === true,
			});

			res.status(201).json({ data: article });
		} catch (error) {
			console.error('Erro ao criar artigo:', error);
			res.status(500).json({ error: 'Erro ao criar artigo' });
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const { title, thumbnail, author, articleImage, description, content, published } = req.body;

			const updateData: {
				title?: string;
				thumbnail?: string;
				author?: string;
				articleImage?: string;
				description?: string;
				content?: string;
				published?: boolean;
			} = {};

			if (title) updateData.title = title;
			if (thumbnail) updateData.thumbnail = thumbnail;
			if (author) updateData.author = author;
			if (articleImage) updateData.articleImage = articleImage;
			if (description) updateData.description = description;
			if (content) updateData.content = content;
			if (published !== undefined) {
				updateData.published = published === 'true' || published === true;
			}

			const article = await articleService.update(Number(id), updateData);
			res.json({ data: article });
		} catch (error) {
			console.error('Erro ao atualizar artigo:', error);
			res.status(500).json({ error: 'Erro ao atualizar artigo' });
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			await articleService.delete(Number(id));
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ error: 'Erro ao deletar artigo' });
		}
	}

	async publish(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const article = await articleService.publish(Number(id));
			res.json(article);
		} catch (error) {
			res.status(500).json({ error: 'Erro ao publicar artigo' });
		}
	}

	async unpublish(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const article = await articleService.unpublish(Number(id));
			res.json(article);
		} catch (error) {
			res.status(500).json({ error: 'Erro ao despublicar artigo' });
		}
	}
}

export const articleController = new ArticleController();
