import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserReturnedData,
  IUserUpdate,
} from "../interfaces/users/index";

const createUserSchema: SchemaOf<IUserRequest> = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  isAdm: yup.boolean().required(),
});

const userReturnedData: SchemaOf<IUserReturnedData> = yup.object().shape({
  isAdm: yup.boolean(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
  isActive: yup.boolean(),
  name: yup.string(),
  email: yup.string().email(),
  id: yup.string(),
});

const listUserReturnedData: SchemaOf<IUserReturnedData[]> =
  yup.array(userReturnedData);

const updateUserSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
});

export {
  createUserSchema,
  userReturnedData,
  listUserReturnedData,
  updateUserSchema,
};
