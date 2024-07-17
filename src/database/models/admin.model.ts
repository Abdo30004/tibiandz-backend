import { Schema, model } from 'mongoose';

import { HashUtil } from '../../utils/hash';

import type { Admin } from '../../types/database';

export const adminSchema = new Schema<Admin>(
  {
    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      required: true
    }
  },

  {
    timestamps: true,
    versionKey: false
  }
);

adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await HashUtil.hash(this.password);
  }

  next();
});

export const AdminModel = model<Admin>('admins', adminSchema);
