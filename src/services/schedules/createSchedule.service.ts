import { parse } from "dotenv";
import { number } from "yup";
import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { SchedulesUserProperties } from "../../entities/schedulesUserProperties.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IScheduleRequest } from "../../interfaces/schedules";

const createScheduleService = async (
  scheduleData: IScheduleRequest,
  userId: string
) => {
  const scheduleRepository = AppDataSource.getRepository(
    SchedulesUserProperties
  );

  const propertyRepository = AppDataSource.getRepository(Properties);

  const userRepository = AppDataSource.getRepository(User);

  const findProperty = await propertyRepository.findOneBy({
    id: scheduleData.propertyId,
  });

  const findUser = await userRepository.findOneBy({
    id: userId,
  });
  if (!findUser) {
    throw new AppError("User not found", 404);
  }
  if (scheduleData.hour > "18:00" || scheduleData.hour < "08:00") {
    throw new AppError("Invalid hour", 400);
  }

  const propertySchedule = await scheduleRepository
    .createQueryBuilder("schedules_user_properties")
    .innerJoinAndSelect(
      "schedules_user_properties.property",
      "propertySchedule"
    )
    .where("propertySchedule.id = :id", { id: scheduleData.propertyId })
    .andWhere("schedules_user_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .andWhere("schedules_user_properties.date = :date", {
      date: scheduleData.date,
    })
    .getOne();

  if (propertySchedule) {
    throw new AppError("Property schedule already exists", 409);
  }

  const userSchedule = await scheduleRepository
    .createQueryBuilder("schedules_user_properties")
    .innerJoinAndSelect("schedules_user_properties.user", "userSchedule")
    .where("userSchedule.id = :id", { id: userId })
    .andWhere("schedules_user_properties.hour = :hour", {
      hour: scheduleData.hour,
    })
    .andWhere("schedules_user_properties.date = :date", {
      date: scheduleData.date,
    })
    .getOne();

  if (userSchedule) {
    throw new AppError("User schedule already exists", 409);
  }

  if (
    new Date(scheduleData.date).getDay() === 0 ||
    new Date(scheduleData.date).getDay() === 6
  ) {
    throw new AppError("Invalid Date", 400);
  }

  const createSchedule = scheduleRepository.create(scheduleData);

  await scheduleRepository.save({
    ...createSchedule,
    property: findProperty,
    user: findUser,
  });

  return {
    message: "Schedule created",
  };
};

export default createScheduleService;
