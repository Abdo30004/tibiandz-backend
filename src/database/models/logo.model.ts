import { Schema, model } from 'mongoose';

import { FileModel } from './file.model';

import type { Logo } from '../../types/database';
const logoSchema = new Schema<Logo>(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    approved: {
      type: Boolean,
      default: false
    },

    author: {
      type: String,
      required: true
    },

    email: {
      type: String,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      required: true
    },

    label: {
      type: String,
      enum: ['new', 'old', 'none'],
      default: 'new'
    },

    tags: {
      type: [String],
      default: []
    },

    fileId: {
      type: String,
      required: true,
      unique: true,
      ref: 'files'
    }
  },

  {
    timestamps: true,
    versionKey: false
  }
);

logoSchema.pre('save', async function (next) {
  if (!this.isModified('fileId')) return next();

  const file = await FileModel.findById(this.fileId);
  if (!file) {
    return next(new Error('File not found'));
  }

  next();
});
logoSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    ret.file = ret.fileId;

    delete ret.fileId;
    delete ret._id;
    return ret;
  }
});

export const LogoModel = model<Logo>('logos', logoSchema);
