import { TFunction } from "i18next";
import { string, object } from "yup";

export const addResellerSchema = (t: TFunction) =>
  object().shape({
    name: string().required(t("Please fill this field")),
    billingId: string().matches(/^[aA-zZ0-9\s]+$/, {
      message:
        "Use only letters and digits, don’t use special characters (e.g. *,%,#)",
      excludeEmptyString: true,
    }),
    distributor: object().shape({
      label: string(),
      value: string().required("Please choose a distributor"),
    }),
    markup: string().matches(/^[0-9\s]+$/, {
      message: "Only numbers and white space allowed",
      excludeEmptyString: true,
    }),
  });

export const editResellerSchema = () =>
  object().shape({
    name: string().required(),
    billingId: string(),
    markup: string().matches(/^([0-9]\.[0-9]{1}|[0-9]\.[0-9]{2}|\.[0-9]{2}|[1-9][0-9]\.[0-9]{1}|[1-9][0-9]\.[0-9]{2}|[0-9][0-9]|[1-9][0-9]\.[0-9]{2})$|^([0-9]|[0-9][0-9]|[0-99])$|^100$/, {
      message: "Only numbers and white space allowed",
      excludeEmptyString: true,
    }),
  });
