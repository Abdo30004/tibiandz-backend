import { Schema, model } from "mongoose";
import { Logo } from "../../types/database";

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

export const LogoModel = model("logos", logoSchema);
