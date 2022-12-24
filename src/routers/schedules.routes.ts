import { Router } from "express";
import {
  createScheduleController,
  listPropertySchedulesController,
} from "../controllers/schedules.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import ensurePropertyExistsMiddleware from "../middlewares/ensurePropertyExists.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  ensureAuthMiddleware,
  ensurePropertyExistsMiddleware,
  createScheduleController
);
schedulesRoutes.get(
  "/properties/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  ensurePropertyExistsMiddleware,
  listPropertySchedulesController
);

export default schedulesRoutes;
