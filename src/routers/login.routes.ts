import { Router } from "express";
import loginCrontroller from "../controllers/login.controller";

const loginRoutes = Router();

loginRoutes.post("", loginCrontroller);

export default loginRoutes;
