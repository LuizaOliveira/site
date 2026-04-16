import { Request, Response } from 'express';
import { ArticleService } from '../services/Article.service';

const articleService = new ArticleService();

export class ArticleController {
	async findAll(req: Request, res: Response): Promise<void> {
		try {
			const articles = await articleService.findAll();
			res.json({ success: true, data: articles });
		} catch (error) {
			res.status(500).json({ success: false, error: 'Erro ao buscar artigos' });
		}
	}

	async findById(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const article = await articleService.findById(Number(id));

			if (!article) {
				res.status(404).json({ success: false, error: 'Artigo não encontrado' });
				return;
			}

			res.json({ success: true, data: article });
		} catch (error) {
			res.status(500).json({ success: false, error: 'Erro ao buscar artigo' });
		}
	}

	async findByAuthor(req: Request, res: Response): Promise<void> {
		try {
			const { author } = req.body;
			const normalizedAuthor = Array.isArray(author) ? author[0] : author;

			if (!normalizedAuthor) {
				res.status(400).json({ success: false, error: 'Parâmetro author é obrigatório' });
				return;
			}

			const articles = await articleService.findByAuthor(normalizedAuthor);
			res.json({ success: true, data: articles });
		} catch (error) {
			res.status(500).json({ success: false, error: 'Erro ao buscar artigos por autor' });
		}
	}

	async findByTag(req: Request, res: Response): Promise<void> {
		try {
			const { tag } = req.params;

			if (!tag) {
				res.status(400).json({ success: false, error: 'Parâmetro tag é obrigatório' });
				return;
			}

			const articles = await articleService.findByTag(tag);
			res.json({ success: true, data: articles });
		} catch (error) {
			res.status(500).json({ success: false, error: 'Erro ao buscar artigos por tag' });
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		try {
			const { title, thumbnail, author, articleImage, description, content, published, tags } = req.body;

			if (!title || !thumbnail || !author || !articleImage || !description || !content) {
				res.status(400).json({
					success: false,
					error: 'Campos obrigatórios: title, thumbnail, author, articleImage, description e content',
				});
				return;
			}

			// Validar tags (máximo 3)
			if (tags && !Array.isArray(tags)) {
				res.status(400).json({
					success: false,
					error: 'Tags deve ser um array',
				});
				return;
			}

			if (tags && tags.length > 3) {
				res.status(400).json({
					success: false,
					error: 'Um artigo pode ter no máximo 3 tags',
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
				tags: tags || [],
			});

			res.status(201).json({ success: true, data: article });
		} catch (error: any) {
			console.error('Erro ao criar artigo:', error);
			res.status(500).json({ success: false, error: error.message || 'Erro ao criar artigo' });
		}
	}

	async update(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const { title, thumbnail, author, articleImage, description, content, published, tags } = req.body;

			const updateData: {
				title?: string;
				thumbnail?: string;
				author?: string;
				articleImage?: string;
				description?: string;
				content?: string;
				published?: boolean;
				tags?: string[];
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

			// Validar tags (máximo 3)
			if (tags !== undefined) {
				if (!Array.isArray(tags)) {
					res.status(400).json({
						success: false,
						error: 'Tags deve ser um array',
					});
					return;
				}

				if (tags.length > 3) {
					res.status(400).json({
						success: false,
						error: 'Um artigo pode ter no máximo 3 tags',
					});
					return;
				}

				updateData.tags = tags;
			}

			const article = await articleService.update(Number(id), updateData);
			res.json({ success: true, data: article });
		} catch (error: any) {
			console.error('Erro ao atualizar artigo:', error);
			res.status(500).json({ success: false, error: error.message || 'Erro ao atualizar artigo' });
		}
	}

	async delete(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			await articleService.delete(Number(id));
			res.status(204).send();
		} catch (error) {
			res.status(500).json({ success: false, error: 'Erro ao deletar artigo' });
		}
	}

	async publish(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const article = await articleService.publish(Number(id));
			res.json({ success: true, data: article });
		} catch (error) {
			res.status(500).json({ success: false, error: 'Erro ao publicar artigo' });
		}
	}

	async unpublish(req: Request, res: Response): Promise<void> {
		try {
			const { id } = req.params;
			const article = await articleService.unpublish(Number(id));
			res.json({ success: true, data: article });
		} catch (error) {
			res.status(500).json({ success: false, error: 'Erro ao despublicar artigo' });
		}
	}
}

export const articleController = new ArticleController();
