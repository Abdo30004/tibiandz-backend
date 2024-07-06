import { Schema, model } from "mongoose";
import { Logo } from "../../types/database";
import { FileModel } from "./file.model";
const logoSchema = new Schema<Logo>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    approved: {
      type: Boolean,
      default: false,
    },

    author: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      enum: ["new", "old", "none"],
      default: "new",
    },

    tags: {
      type: [String],
      default: [],
    },

    fileId: {
      type: String,
      required: true,
      ref: "files",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

logoSchema.pre("save", async function (next) {
  const logo = this;
  const file = await FileModel.findById(logo.fileId);
  if (!file) {
    throw new Error("File not found");
  }
  next();
});

export const LogoModel = model<Logo>("logos", logoSchema);
