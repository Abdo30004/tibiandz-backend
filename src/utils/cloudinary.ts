import 'dotenv/config';

import { v2 as cloudinary } from 'cloudinary';

import type { Express } from 'express';

export class CloudinaryUtil {
  private static readonly config = cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });

  private static readonly folder = 'uploads';

  static async uploadFileToCloud(file: Express.Multer.File, id: string) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: this.folder,
      resource_type: 'image',
      public_id: id
    });

    return result;
  }

  static async deleteFileFromCloud(id: string) {
    try {
      const publicId = `${this.folder}/${id}`;
      await cloudinary.uploader.destroy(publicId);
      return true;
    } catch {
      return false;
    }
  }
}
