import { TFunction } from "i18next";
import { string, object } from "yup";

export const addDistributorSchema = (t: TFunction) =>
  object().shape({
    name: string()
      .required(t("Please fill this field"))
      .matches(/^[aA-zZ0-9\s]+$/, {
        message: t("Use only letters and digits"),
        excludeEmptyString: true,
      }),
    billingId: string(),
    markup: string().matches(
      /^([0-9]\.[0-9]{1}|[0-9]\.[0-9]{2}|\.[0-9]{2}|[1-9][0-9]\.[0-9]{1}|[1-9][0-9]\.[0-9]{2}|[0-9][0-9]|[1-9][0-9]\.[0-9]{2})$|^([0-9]|[0-9][0-9]|[0-99])$|^100$/,
      {
        message: "Only numbers from 0 to 100 allowed",
        excludeEmptyString: true,
      },
    ),
  });

export const editDistributorSchema = (t: TFunction) =>
  object().shape({
    name: string().required(),
    billingId: string().required(),
    markup: string().matches(
      /^([0-9]\.[0-9]{1}|[0-9]\.[0-9]{2}|\.[0-9]{2}|[1-9][0-9]\.[0-9]{1}|[1-9][0-9]\.[0-9]{2}|[0-9][0-9]|[1-9][0-9]\.[0-9]{2})$|^([0-9]|[0-9][0-9]|[0-99])$|^100$/,
      {
        message: t("Only numbers from 0 to 100 allowed"),
        excludeEmptyString: true,
      },
    ),
  });
