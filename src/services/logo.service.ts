import { LogoModel } from '../database/models/logo.model';

import type { Logo } from '../types/database';


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
      const logo = await LogoModel.create(logoData);
      return logo;
    } catch {
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

      return logo;
    } catch {
      return null;
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
}
