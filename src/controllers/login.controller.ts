import { Request, Response } from "express";
import { IUserLogin } from "../interfaces/users";
import loginService from "../services/login/login.service";

const loginCrontroller = async (req: Request, res: Response) => {
  const userLogin: IUserLogin = req.body;
  const token = await loginService(userLogin);
  return res.json({ token });
};
export default loginCrontroller;
