import 'dotenv/config';

import { v2 as cloudinary } from 'cloudinary';

import type { Express } from 'express';

export class CloudinaryUtil {
  static async uploadFileToCloud(file: Express.Multer.File, id: string) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true
    });
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'uploads',
      resource_type: 'image',
      public_id: id
    });


    return result;
  }

  static async deleteFileFromCloud(id: string) {
    const result = await cloudinary.uploader.destroy(id);
    return true;
  }
}
