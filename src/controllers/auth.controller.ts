import { StatusCodes } from 'http-status-codes';

import { AuthService } from '../services/auth.service';
import { ErrorResponse, SuccessResponse } from '../utils/response';

import type { Request, Response } from 'express';

export class AuthController {
  static async login(req: Request, res: Response) {
    const email = req.body.email as string;
    const password = req.body.password as string;

    const token = await AuthService.login(email, password);

    if (!token) {
      const errorResponse = new ErrorResponse().setError('Invalid email or password');
      return res.status(StatusCodes.UNAUTHORIZED).json(errorResponse);
    }

    const successResponse = new SuccessResponse({
      message: 'Login successful',
      data: token
    });

    res.json(successResponse);
  }
}
