import { ErrorResponse } from "../utils/response";
import { Response, Request, NextFunction, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export class ErrorHandler {
  static asyncHandler(handler: RequestHandler) {
    return (req: Request, res: Response, next: NextFunction) => {
      return Promise.resolve(handler(req, res, next)).catch(next);
    };
  }

  static notFound(req: Request, res: Response) {
    const errorResponse = new ErrorResponse().setError("Not Found");

    return res.status(StatusCodes.NOT_FOUND).json(errorResponse);
  }

  static internalServerError(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const errorResponse = new ErrorResponse().setError(
      "Internal Server Error - " + err.message
    );

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}
