import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserReturnedData } from "../../interfaces/users";
import { listUserReturnedData } from "../../schemas/users.schemas";

const listUsersService = async (): Promise<IUserReturnedData[]> => {
  const usersRepository = AppDataSource.getRepository(User);

  const users = usersRepository.find();

  const listUsers = await listUserReturnedData.validate(await users, {
    stripUnknown: true,
  });

  return listUsers;
};

export default listUsersService;
