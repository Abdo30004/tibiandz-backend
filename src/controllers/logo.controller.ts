import { StatusCodes } from 'http-status-codes';

import { LogoService } from '../services/logo.service';
import { ErrorResponse, SuccessResponse } from '../utils/response';

import type { Logo } from '../types/database';
import type { Request, Response } from 'express';

export class LogoController {
  static async getAllLogos(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const logos = await LogoService.getAll(page, limit);

    if (!logos) {
      const errorResponse = new ErrorResponse().setError('Error fetching logos');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Logos fetched successfully',
      data: logos
    });

    res.json(successResponse);
  }
  static async getLogoById(req: Request, res: Response) {
    const id = req.params.id;

    const logo = await LogoService.getById(id);

    if (!logo) {
      const errorResponse = new ErrorResponse().setError('Logo not found');
      return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Logo fetched successfully',
      data: logo
    });

    res.json(successResponse);
  }

  static async createLogo(req: Request, res: Response) {
    const logoData = req.body as Logo;

    const logo = await LogoService.create(logoData);

    if (!logo) {
      const errorResponse = new ErrorResponse().setError('Error creating logo');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Logo created successfully',
      data: logo
    });

    res.json(successResponse);
  }

  static async updateLogo(req: Request, res: Response) {
    const id = req.params.id;
    const logoData = req.body as Partial<Logo>;

    const logo = await LogoService.update(id, logoData);

    if (!logo) {
      const errorResponse = new ErrorResponse().setError('Error updating logo');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Logo updated successfully',
      data: logo
    });

    res.json(successResponse);
  }

  static async deleteLogo(req: Request, res: Response) {
    const id = req.params.id;

    const logo = await LogoService.delete(id);

    if (!logo) {
      const errorResponse = new ErrorResponse().setError('Error deleting logo');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Logo deleted successfully',
      data: logo
    });

    res.json(successResponse);
  }

  static async approveLogo(req: Request, res: Response) {
    const id = req.params.id;

    const result = await LogoService.approve(id);

    if (!result) {
      const errorResponse = new ErrorResponse().setError('Error approving logo');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Logo approved successfully',
      data: result
    });

    res.json(successResponse);
  }

  static async rejectLogo(req: Request, res: Response) {
    const id = req.params.id;

    const result = await LogoService.reject(id);

    if (!result) {
      const errorResponse = new ErrorResponse().setError('Error rejecting logo');
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Logo rejected successfully',
      data: result
    });

    res.json(successResponse);
  }
}
