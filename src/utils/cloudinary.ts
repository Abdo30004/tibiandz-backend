import { v2 as cloudinary } from "cloudinary";
import { unlink } from "fs/promises";
import { FileModel } from "../database/models/file.model";
import path from "path";

export class CloudinaryUtil {
  private static config = true;
  static async uploadFileToCloud(file: Express.Multer.File) {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    const extention = path.extname(file.originalname).slice(1);

    const newFile = new FileModel({
      name: file.originalname,
      size: file.size,
      type: extention,
    });

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "uploads",
      resource_type: "image",
      public_id: newFile.id,
    });

    newFile.link = result.secure_url;
    await newFile.save();

    await unlink(file.path);
    return newFile;
  }
}
