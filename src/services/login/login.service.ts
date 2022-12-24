import { IUserLogin } from "../../interfaces/users";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import "dotenv/config";
import { AppError } from "../../errors/AppError";

const loginService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }
  if (user.isActive === false) {
    throw new AppError("User is not active", 400);
  }

  const token = jwt.sign({ isAdm: user.isAdm }, process.env.SECRET_KEY, {
    subject: user.id,
    expiresIn: "24h",
  });
  return token;
};

export default loginService;
