import * as yup from "yup";
import { SchemaOf } from "yup";
import { IPropertyRequest } from "../interfaces/properties";
const createPropertySchema: SchemaOf<IPropertyRequest> = yup.object().shape({
  value: yup.number().required(),
  size: yup.number().required(),
  address: yup
    .object()
    .required()
    .shape({
      district: yup.string(),
      zipCode: yup.string().max(8),
      number: yup.string().notRequired(),
      city: yup.string(),
      state: yup.string().max(2),
    }),
  categoryId: yup.string().required(),
});

export { createPropertySchema };

//   export interface IAddressRequest {
//     district: string
//     zipCode: string
//     number?: string
//     city: string
//     state: string
// }

// export interface IPropertyRequest {
//     value: number
//     size: number
//     address: IAddressRequest
//     categoryId: string
