import { Router } from "express";
import {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryController,
} from "../controllers/categories.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  createCategoryController
);

categoriesRoutes.get("", listCategoriesController);

categoriesRoutes.get("/:id/properties", listPropertiesByCategoryController);

export default categoriesRoutes;
