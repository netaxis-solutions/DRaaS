import { TFunction } from "i18next";
import { string, object } from "yup";

export const addLicenseSchema = () => object().shape({});

export const editLicenseSchema = (t: TFunction) =>
  object().shape({
    assigned: string()
      .matches(/^\d+(?:\.\d+)?$/, {
        message: t(
          "Incorrect assigned number. Number must not be negative or greater than inUse ",
        ),
      })
      .required(),
  });
