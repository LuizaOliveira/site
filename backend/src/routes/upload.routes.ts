import { Router } from 'express';
import { singleUpload } from '../middlewares/upload.middleware';
import { uploadService } from '../services/Upload.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import fs from 'fs';

const router = Router();

// Rota para upload individual de arquivos (protegida - apenas usuários autenticados)
router.post('/', authMiddleware, singleUpload.single('file'), async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('File:', req.file);
    console.log('Body:', req.body);

    if (!req.file) {
      console.log('No file provided in request');
      return res.status(400).json({ error: 'Nenhum arquivo fornecido' });
    }

    console.log(`Processing file: ${req.file.originalname}, type: ${req.file.mimetype}`);

    let uploadResult;

    // Verifica o tipo do arquivo e faz upload apropriado
    if (req.file.mimetype.startsWith('image/')) {
      console.log('Uploading image to Cloudinary');
      uploadResult = await uploadService.uploadImage(req.file.path);
    } else if (req.file.mimetype === 'application/pdf') {
      console.log('Uploading PDF to Cloudinary');
      uploadResult = await uploadService.uploadPdf(req.file.path);
    } else {
      console.log(`Unsupported file type: ${req.file.mimetype}`);
      // Remove arquivo temporário e retorna erro
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ error: 'Tipo de arquivo não suportado' });
    }

    console.log('Upload successful, result:', uploadResult.secure_url);

    // Remove arquivo temporário
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      url: uploadResult.secure_url,
      message: 'Upload realizado com sucesso'
    });

  } catch (error) {
    console.error('Erro detalhado no upload:', error);

    // Remove arquivo temporário se houver erro
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      error: 'Erro interno no upload',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export default router;