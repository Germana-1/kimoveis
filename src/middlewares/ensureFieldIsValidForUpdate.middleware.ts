import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

const ensureFieldIsValidForUpdateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const updateDataKeys = Object.keys(req.body);

  const isAdmField = updateDataKeys.find((key) => key === "isAdm");

  const idField = updateDataKeys.find((key) => key === "id");

  const isActiveField = updateDataKeys.find((key) => key === "isActive");

  if (isAdmField || idField || isActiveField) {
    throw new AppError("This field cannot be updated", 401);
  }
  return next();
};

export default ensureFieldIsValidForUpdateMiddleware;
