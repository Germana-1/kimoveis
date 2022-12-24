import { Request, Response } from "express";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listPropertiesByCategoryService from "../services/categories/listPropertiesByCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  const newCategory = await createCategoryService(req.body);
  return res.status(201).json(newCategory);
};

const listCategoriesController = async (req: Request, res: Response) => {
  const listCategories = await listCategoriesService();
  res.json(listCategories);
};

const listPropertiesByCategoryController = async (
  req: Request,
  res: Response
) => {
  const listProperties = await listPropertiesByCategoryService(req.params.id);
  res.json(listProperties);
};

export {
  createCategoryController,
  listCategoriesController,
  listPropertiesByCategoryController,
};
