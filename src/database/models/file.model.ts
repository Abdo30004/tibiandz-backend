import { Schema, model } from 'mongoose';

import type { File } from '../../types/database';

const fileSchema = new Schema<File>(
  {
    name: {
      type: String,
      required: true
    },

    link: {
      type: String,
      required: true
    },

    type: {
      type: String,
      enum: ['svg', 'ai', 'eps'],
      required: true
    },

    size: {
      type: Number,
      required: true
    }
  },

  {
    timestamps: true,
    versionKey: false
  }
);

fileSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id;

    delete ret._id;
    return ret;
  }
});

export const FileModel = model<File>('files', fileSchema);
