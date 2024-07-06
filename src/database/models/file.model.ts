import { Schema, model } from "mongoose";

import { File } from "../../types/database";

const fileSchema = new Schema<File>(
  {
    name: {
      type: String,
      required: true,
    },

    link: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["svg", "ai", "eps"],
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

export const FileModel = model("files", fileSchema);
