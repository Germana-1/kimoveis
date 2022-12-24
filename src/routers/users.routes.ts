import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUsersController,
  updateUserController,
} from "../controllers/users.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureIsAdmMiddleware from "../middlewares/ensureIsAdm.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/users.schemas";
import ensureOwnsIdOrIsAdminMiddleware from "../middlewares/ensureOwnsIdOrIsAdmin.middleware";
import ensureFieldIsValidForUpdateMiddleware from "../middlewares/ensureFieldIsValidForUpdate.middleware";

const usersRouter = Router();

usersRouter.post(
  "",
  ensureDataIsValidMiddleware(createUserSchema),
  createUserController
);
usersRouter.get(
  "",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  listUsersController
);

usersRouter.delete(
  "/:id",
  ensureAuthMiddleware,
  ensureIsAdmMiddleware,
  deleteUserController
);

usersRouter.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureOwnsIdOrIsAdminMiddleware,
  ensureFieldIsValidForUpdateMiddleware,
  updateUserController
);

export default usersRouter;
