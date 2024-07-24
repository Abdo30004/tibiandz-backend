import rateLimit from 'express-rate-limit';
import { StatusCodes } from 'http-status-codes';

import { ErrorResponse } from '../utils/response';
/**
 * @description Middleware to limit the number of requests
 * @param maxRequests the maximum number of requests
 * @param rememberTime the time to remember the requests in milliseconds
 * @returns
 */
export function rateLimiter(maxRequests: number, rememberTime: number = 15 * 60 * 1000) {
  const rateLimiter = rateLimit({
    limit: maxRequests,
    windowMs: rememberTime,
    handler: (req, res) => {
      const errorResponse = new ErrorResponse().setError('Too many requests, please try again later.');

      res.status(StatusCodes.TOO_MANY_REQUESTS).json(errorResponse);
    },

    standardHeaders: true,
    legacyHeaders: true
  });

  return rateLimiter;
}
