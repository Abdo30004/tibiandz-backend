import { FileModel } from '../database/models/file.model';
import { LogoModel } from '../database/models/logo.model';

import type { Logo } from '../types/database';
import { FileService } from './file.service';

export class LogoService {
  static async getAll(page: number, limit: number) {
    try {
      const logos = await LogoModel.find()
        .skip((page - 1) * limit)
        .limit(limit);

      return logos;
    } catch {
      return null;
    }
  }

  static async getById(id: string) {
    try {
      const logo = await LogoModel.findById(id);
      return logo;
    } catch {
      return null;
    }
  }

  static async create(logoData: Logo) {
    try {
      const file = await FileModel.findById({ _id: logoData.fileId });
      console.log(file);
      if (!file) {
        console.log('File not found');
        return null;
      }

      const logo = await LogoModel.create(logoData);
      return logo;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async update(id: string, logoData: Partial<Logo>) {
    try {
      const logo = await LogoModel.findByIdAndUpdate(id, logoData, {
        new: true
      });
      return logo;
    } catch {
      return null;
    }
  }

  static async delete(id: string) {
    try {
      const logo = await LogoModel.findByIdAndDelete(id);
      if (!logo) {
        return false;
      }
      await FileService.delete(logo.fileId);

      return true;
    } catch {
      return false;
    }
  }

  static async approve(id: string) {
    try {
      await LogoModel.updateOne({ _id: id }, { approved: true });
      return true;
    } catch {
      return false;
    }
  }

  static async reject(id: string) {
    try {
      await LogoModel.updateOne({ _id: id }, { approved: false });

      return true;
    } catch {
      return false;
    }
  }

  static async search(query: string): Promise<Logo[] | null> {
    try {
      const logos = await LogoModel.find({
        $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }]
      });

      return logos;
    } catch {
      return null;
    }
  }

  static async autoComplete(query: string): Promise<string[] | null> {
    try {
      const logos = await LogoModel.find({
        name: { $regex: query, $options: 'i' }
      }).limit(10);

      return logos.map(logo => logo.name);
    } catch {
      return null;
    }
  }
}
