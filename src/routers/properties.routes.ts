import { Router } from "express";
import {
  createPropertyController,
  listPropertiesController,
} from "../controllers/properties.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import { createPropertySchema } from "../schemas/properties.schemas";

const propertiesRoutes = Router();

propertiesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  ensureDataIsValidMiddleware(createPropertySchema),
  createPropertyController
);

propertiesRoutes.get("", listPropertiesController);

export default propertiesRoutes;
