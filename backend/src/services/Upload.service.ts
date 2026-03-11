import cloudinary from '../lib/cloudinary';
import { UploadApiResponse } from 'cloudinary';

export class UploadService {
  async uploadImage(filePath: string): Promise<UploadApiResponse> {
    return cloudinary.uploader.upload(filePath, {
      folder: 'cma/thumbnails',
      resource_type: 'image',
      transformation: [
        { width: 800, height: 600, crop: 'limit' },
        { quality: 'auto' },
        { format: 'webp' },
      ],
    });
  }

  async uploadPdf(filePath: string): Promise<UploadApiResponse> {
    return cloudinary.uploader.upload(filePath, {
      folder: 'cma/pdfs',
      resource_type: 'raw',
    });
  }

  async deleteFile(publicId: string, resourceType: 'image' | 'raw' = 'image'): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  }
}

export const uploadService = new UploadService();
