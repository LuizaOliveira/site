import { Router } from 'express';
import userRoutes from './user.routes';
import postRoutes from './post.routes';
import authRoutes from './auth.routes';
import uploadRoutes from './upload.routes';
import articleRoutes from './article.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/upload', uploadRoutes);
router.use('/articles', articleRoutes);

export default router;
