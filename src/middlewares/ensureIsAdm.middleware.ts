import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureIsAdmMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  if (!isAdm) {
    throw new AppError("Requires admin authorization", 403);
  }
  return next();
};

export default ensureIsAdmMiddleware;
