import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteUserService = async (id: string): Promise<void> => {
  // const userRepository = AppDataSource.getRepository(User);

  // const [user] = await userRepository.find({
  //   withDeleted: true,
  //   where: { id: id },
  // });

  // if (!user) {
  //   throw new AppError("Id doesn't exist ", 404);
  // }

  // if (!user.isActive) {
  //   throw new AppError("Inactive user", 400);
  // }

  // await userRepository.softRemove(user);

  // const deleteUser = await userRepository.save({ ...user, isActive: false });
  // console.log(deleteUser);
  const userRepository = AppDataSource.getRepository(User);

  const listUsers = userRepository.find();

  const idIsValid = (await listUsers).find((user) => user.id === id);

  if (!idIsValid) {
    throw new AppError("Id doesn't exist", 404);
  }

  if (!idIsValid.isActive) {
    throw new AppError("Inactive user", 400);
  }

  await userRepository.update({ id: id }, { isActive: false });
};

export default deleteUserService;
