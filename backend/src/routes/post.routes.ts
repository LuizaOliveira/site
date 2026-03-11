import { Router } from 'express';
import { postController } from '../controllers/Post.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Rotas públicas (leitura)
router.get('/', (req, res) => postController.findAll(req, res));
router.get('/published', (req, res) => postController.findPublished(req, res));
router.get('/:id', (req, res) => postController.findById(req, res));

// Rotas protegidas (requerem autenticação)
// Agora recebem apenas JSON com os campos do post (title, thumbnail, file, published)
router.post('/', authMiddleware, (req, res) => postController.create(req, res));
router.put('/:id', authMiddleware, (req, res) => postController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => postController.delete(req, res));
router.patch('/:id/publish', authMiddleware, (req, res) => postController.publish(req, res));
router.patch('/:id/unpublish', authMiddleware, (req, res) => postController.unpublish(req, res));

export default router;
