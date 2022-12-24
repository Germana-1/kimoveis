import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";
import { ICategoryRequest } from "../../interfaces/categories";

const createCategoryService = async (
  categoryData: ICategoryRequest
): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryAlreadyExists = categoryRepository.findOneBy({
    name: categoryData.name,
  });

  if (await categoryAlreadyExists) {
    throw new AppError("category already exists", 409);
  }

  const newCategory = categoryRepository.create(categoryData);

  await categoryRepository.save(newCategory);

  return newCategory;
};

export default createCategoryService;
