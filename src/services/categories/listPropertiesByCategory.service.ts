import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/AppError";

const listPropertiesByCategoryService = async (
  id: string
): Promise<Categories> => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const [listProperties] = await categoriesRepository.find({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });
  if (!listProperties) {
    throw new AppError("Category not found", 404);
  }

  return listProperties;
};

export default listPropertiesByCategoryService;
