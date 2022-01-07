import { string, object } from "yup";

export const addLicenseSchema = () => object().shape({});

export const editLicenseSchema = () =>
  object().shape({
    assigned: string().required(),
  });
