import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Criar pasta de uploads temporários se não existir
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedPdfTypes = ['application/pdf'];

  if (file.fieldname === 'thumbnail' && allowedImageTypes.includes(file.mimetype)) {
    cb(null, true);
  } else if (file.fieldname === 'file' && allowedPdfTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo não permitido para o campo ${file.fieldname}`));
  }
};

// File filter para upload individual (aceita imagens e PDFs)
const singleFileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedPdfTypes = ['application/pdf'];

  if (allowedImageTypes.includes(file.mimetype) || allowedPdfTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo não permitido: ${file.mimetype}`));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});

// Upload para arquivos individuais
export const singleUpload = multer({
  storage,
  fileFilter: singleFileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB para upload individual
  },
});

export const postUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'file', maxCount: 1 },
]);
