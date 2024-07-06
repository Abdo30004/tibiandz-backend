import { Schema,model} from "mongoose";
import { Admin } from "../../types/database";

export const adminSchema = new Schema<Admin>(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);


export const AdminModel = model("admins", adminSchema);