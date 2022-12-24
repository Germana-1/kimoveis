import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";

const listPropertiesService = async (): Promise<Properties[]> => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  return await propertyRepository.find({
    relations: {
      address: true,
      category: true,
    },
  });
};

export default listPropertiesService;
