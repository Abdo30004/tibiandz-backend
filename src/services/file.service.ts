import path from 'path';

import { FileModel } from '../database/models/file.model';
import { CloudinaryUtil } from '../utils/cloudinary';

import type { Express } from 'express';

export class FileService {
  static async upload(file: Express.Multer.File) {
    try {
      const extention = path.extname(file.originalname).slice(1);

      const newFile = new FileModel({
        name: file.originalname,
        size: file.size,
        type: extention
      });

      const cloudinaryResult = await CloudinaryUtil.uploadFileToCloud(file, newFile.id);

      newFile.link = cloudinaryResult.secure_url;

      await newFile.save();
      return newFile;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async getById(id: string) {
    try {
      const file = await FileModel.findById(id);
      return file;
    } catch {
      return null;
    }
  }

  static async delete(id: string) {
    try {
      await FileModel.findByIdAndDelete(id);
      await CloudinaryUtil.deleteFileFromCloud(id);
      return true;
    } catch {
      return false;
    }
  }
}
