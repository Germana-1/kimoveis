import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureOwnsIdOrIsAdminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm = req.user.isAdm;
  if (req.params.id !== req.user.id && !isAdm) {
    throw new AppError("Requires admin authorization", 401);
  }

  return next();
};

export default ensureOwnsIdOrIsAdminMiddleware;
