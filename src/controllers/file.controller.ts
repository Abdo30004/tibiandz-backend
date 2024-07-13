import { StatusCodes } from 'http-status-codes';
import path from 'path';

import { CloudinaryUtil } from '../utils/cloudinary';
import { ErrorResponse, SuccessResponse } from '../utils/response';

import type { Request, Response } from 'express';
export class FileController {
  static async upload(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      const errorResponse = new ErrorResponse({
        error: "Please upload a file in the 'logo' field"
      });
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    if (file.size > 10 * 1024 * 1024) {
      const errorResponse = new ErrorResponse({
        error: 'File size should not exceed 10MB'
      });
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    const allowedExtensions = ['svg', 'ai', 'eps'];

    const fileExtension = path.extname(file.originalname).slice(1);

    if (!allowedExtensions.includes(fileExtension)) {
      const errorResponse = new ErrorResponse({
        error: 'Invalid file type. Only SVG, AI, and EPS files are allowed'
      });
      return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
    }

    const fileData = await CloudinaryUtil.uploadFileToCloud(file);

    const successResponse = new SuccessResponse({
      message: 'File uploaded successfully',
      data: fileData
    });

    return res.status(StatusCodes.OK).json(successResponse);
  }

  static async getById(req: Request, res: Response) {
    const id = req.params.id;

    //const file = await FileModel
  }
}
