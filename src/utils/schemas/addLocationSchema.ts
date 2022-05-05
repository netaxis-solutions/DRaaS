import { string, object, boolean } from "yup";

export const addLocationSchema = () =>
  object().shape({
    postalCodeId: object().shape({
      label: string(),
      value: string().required("asdasd"),
    }),
    street: string().required(),
    number: string().required(),
    postbox: string(),
    agreement: boolean().required().oneOf([true], "Field must be checked"),
  });
