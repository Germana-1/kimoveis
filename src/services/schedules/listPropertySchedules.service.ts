import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const listPropertySchedulesService = async (propertyId: string) => {
  const propertiesRepository = AppDataSource.getRepository(Properties);

  const list = await propertiesRepository
    .createQueryBuilder("properties")
    .innerJoinAndSelect("properties.schedules", "propertySchedule")
    .innerJoinAndSelect("propertySchedule.user", "users")
    .where("properties.id = :propertyId", {
      propertyId: propertyId,
    })
    .getOne();

  return list;
};

export default listPropertySchedulesService;
