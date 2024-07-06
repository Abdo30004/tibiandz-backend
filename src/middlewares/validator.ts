import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/response";

export function validator(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponse = new ErrorResponse().setError(
      "Validation Error\n" +
        errors
          .array()
          .map((e, i) => `${i + 1}.${e.msg}`)
          .join("\n")
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }
  next();
}
