import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest, IUserReturnedData } from "../../interfaces/users";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserReturnedData> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = userRepository.exist({ where: { email: userData.email } });

  if (await findUser) {
    throw new AppError("user already exists", 409);
  }

  const user = userRepository.create(userData);

  await userRepository.save(user);

  const userDataExceptPassword = { ...user };

  delete userDataExceptPassword.password;

  return userDataExceptPassword;
};

export default createUserService;
