import { FileService } from './file.service';
import { FileModel } from '../database/models/file.model';
import { LogoModel } from '../database/models/logo.model';

import type { Logo } from '../types/database';
import type { FilterQuery } from 'mongoose';

export class LogoService {
  static async getAll(page: number, limit: number) {
    try {
      const logos = await LogoModel.find({
        approved: true
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('fileId');

      return logos;
    } catch {
      return null;
    }
  }

  static async getNew(page: number, limit: number) {
    try {
      const logos = await LogoModel.find({
        label: 'new',
        approved: true
      })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('fileId');

      return logos;
    } catch {
      return null;
    }
  }

  static async getPending(page: number, limit: number) {
    try {
      const logos = await LogoModel.find({
        approved: false
      })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('fileId');

      return logos;
    } catch {
      return null;
    }
  }

  static async getById(id: string) {
    try {
      const logo = await LogoModel.findById(id).populate('fileId');
      return logo;
    } catch {
      return null;
    }
  }

  static async submit(logoData: Logo) {
    const logo = await LogoService.create({
      ...logoData,
      approved: false
    });
    if (!logo) {
      return false;
    }

    return true;
  }

  static async createLogoAdmin(logoData: Logo) {
    const logo = await LogoService.create({
      ...logoData,
      approved: true
    });
    return logo;
  }

  static async create(logoData: Logo) {
    try {
      const file = await FileModel.findById({ _id: logoData.fileId });
      if (!file) {
        console.log('File not found');
        return null;
      }

      const logo = await LogoModel.create({
        ...logoData
      });
      return logo;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async update(id: string, logoData: Partial<Logo>) {
    try {
      const logo = await LogoModel.findByIdAndUpdate(id, logoData, {
        new: false
      });

      if (logo && logo.fileId !== logoData.fileId) {
        await FileService.delete(logo.fileId);
      }

      return true;
    } catch {
      return false;
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
      const deleted = await LogoService.delete(id);
      return deleted;
    } catch {
      return false;
    }
  }

  static async search(query: string): Promise<Logo[] | null> {
    try {
      const logos = await LogoModel.find({
        $or: [{ name: { $regex: query, $options: 'i' } }, { description: { $regex: query, $options: 'i' } }],
        approved: true
      }).populate('fileId');

      return logos;
    } catch {
      return null;
    }
  }

  static async autoComplete(query: string | undefined): Promise<string[] | null> {
    try {
      let filter: FilterQuery<Logo>;

      if (!query || query.trim() === '') {
        filter = { approved: true };
      } else {
        filter = { name: { $regex: query, $options: 'i' }, approved: true };
      }

      const logos = await LogoModel.find(filter).limit(5);

      return logos.map(logo => logo.name);
    } catch {
      return null;
    }
  }
}
