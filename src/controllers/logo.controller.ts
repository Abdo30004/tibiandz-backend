import { Request, Response } from "express";
import { SuccessResponse, ErrorResponse } from "../utils/response";
import { LogoService } from "../services/logo.service";
import { Logo } from "../types/database";
import { StatusCodes } from "http-status-codes";

export class LogoController {
  static async createLogo(req: Request, res: Response) {
    const logoData = req.body as Logo;

    const logo = await LogoService.create(logoData);

    if (!logo) {
      const errorResponse = new ErrorResponse().setError("Error creating logo");
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: "Logo created successfully",
      data: logo,
    });

    res.json(successResponse);
  }

  static async getAllLogos(req: Request, res: Response) {
    const logos = await LogoService.getAll();

    if (!logos) {
      const errorResponse = new ErrorResponse().setError(
        "Error fetching logos"
      );
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: "Logos fetched successfully",
      data: logos,
    });

    res.json(successResponse);
  }
}
