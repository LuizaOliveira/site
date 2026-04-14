import { Router } from 'express';
import { articleController } from '../controllers/Article.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', (req, res) => articleController.findAll(req, res));
router.post('/author', (req, res) => articleController.findByAuthor(req, res));
router.get('/:id', (req, res) => articleController.findById(req, res));

router.post('/', authMiddleware, (req, res) => articleController.create(req, res));
router.put('/:id', authMiddleware, (req, res) => articleController.update(req, res));
router.delete('/:id', authMiddleware, (req, res) => articleController.delete(req, res));
router.patch('/:id/publish', authMiddleware, (req, res) => articleController.publish(req, res));
router.patch('/:id/unpublish', authMiddleware, (req, res) => articleController.unpublish(req, res));

export default router;