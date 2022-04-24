import { TFunction } from "i18next";
import { string, object, boolean } from "yup";

export const addTenantSchema = (t: TFunction, isDirect?: boolean) =>
  object().shape({
    name: string()
      .required(t("Please fill this field"))
      .matches(/^[aA-zZ0-9\s]+$/, {
        message: t("Use only letters and digits"),
        excludeEmptyString: true,
      }),
    billingId: string(),
    isDirectTenant: boolean(),
    owner: object().shape({
      label: string(),
      value: string().when("isDirectTenant", {
        is: () => !isDirect,
        then: string().required(t("Please choose an owner")),
        otherwise: string(),
      }),
    }),
    markup: string().matches(
      /^([0-9]\.[0-9]{1}|[0-9]\.[0-9]{2}|\.[0-9]{2}|[1-9][0-9]\.[0-9]{1}|[1-9][0-9]\.[0-9]{2}|[0-9][0-9]|[1-9][0-9]\.[0-9]{2})$|^([0-9]|[0-9][0-9]|[0-99])$|^100$/,
      {
        message: t("Only numbers from 0 to 100 allowed"),
        excludeEmptyString: true,
      },
    ),
  });

export const editTenantSchema = (t: TFunction) =>
  object().shape({
    name: string().required(),
    billingId: string(),
    markup: string().matches(
      /^([0-9]\.[0-9]{1}|[0-9]\.[0-9]{2}|\.[0-9]{2}|[1-9][0-9]\.[0-9]{1}|[1-9][0-9]\.[0-9]{2}|[0-9][0-9]|[1-9][0-9]\.[0-9]{2})$|^([0-9]|[0-9][0-9]|[0-99])$|^100$/,
      {
        message: t("Only numbers from 0 to 100 allowed"),
        excludeEmptyString: true,
      },
    ),
  });
