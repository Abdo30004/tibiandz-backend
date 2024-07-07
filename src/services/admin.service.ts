import { AdminModel } from '../database/models/admin.model';

import type { Admin } from '../types/database';

export class AdminService {
  async getAll() {
    const admins = await AdminModel.find();
    return admins;
  }

  async getById(id: string) {
    const admin = await AdminModel.findById(id);
    return admin;
  }

  async create(adminData: Admin) {
    const admin = await AdminModel.create(adminData);
    return admin;
  }

  async update(id: string, adminData: Partial<Admin>) {
    const admin = await AdminModel.findByIdAndUpdate(id, adminData, {
      new: true
    });

    return admin;
  }
}
