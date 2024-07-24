import { StatusCodes } from 'http-status-codes';

import { AdminModel } from '../database/models/admin.model';
import { JwtUtil } from '../utils/jwt';
import { ErrorResponse } from '../utils/response';

import type { NextFunction, Request, Response } from 'express';

/**
 * @description Middleware to check if the user as admin is authenticated
 * @param req the request object
 * @param res the response object
 * @param next the next function
 * @returns
 */
export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json(new ErrorResponse().setError('no token provided'));
  }

  const data = await JwtUtil.verifyToken(token);

  if (!data) {
    return res.status(StatusCodes.UNAUTHORIZED).json(new ErrorResponse().setError('invalid token'));
  }

  const user = await AdminModel.findById(data.id);
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json(new ErrorResponse().setError('invalid token'));
  }

  req.user = user;

  next();
}
