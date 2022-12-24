import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Properties } from "../entities/properties.entity";
import { AppError } from "../errors/AppError";

const ensurePropertyExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const propertyRepository = AppDataSource.getRepository(Properties);
  const propertyId = req.params.id || req.body.propertyId;
  const findProperty = await propertyRepository.findOneBy({
    id: propertyId,
  });

  if (!findProperty) {
    throw new AppError("Property not found", 404);
  }

  return next();
};

export default ensurePropertyExistsMiddleware;
