import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors/AppError";
import { IPropertyRequest } from "../../interfaces/properties";

const createPropertyService = async (propertyData: IPropertyRequest) => {
  const propertyRepository = AppDataSource.getRepository(Properties);

  const addressRepository = AppDataSource.getRepository(Addresses);

  const categoryRepository = AppDataSource.getRepository(Categories);

  const existingAddress = await addressRepository.findOneBy({
    district: propertyData.address.district,
    number: propertyData.address.number,
  });

  const findCategory = await categoryRepository.findOneBy({
    id: propertyData.categoryId,
  });
  if (!findCategory) {
    throw new AppError("Category not found", 404);
  }
  if (existingAddress) {
    throw new AppError("Address already exists", 409);
  }
  const createAddress = addressRepository.create(propertyData.address);

  const createProperty = propertyRepository.create(propertyData);

  await addressRepository.save(createAddress);

  const newProperty = await propertyRepository.save({
    ...createProperty,
    category: findCategory,
    address: createAddress,
  });

  return newProperty;
};

export default createPropertyService;
