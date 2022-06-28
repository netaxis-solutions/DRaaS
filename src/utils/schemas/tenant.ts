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
    isDirectTenant: boolean(),
    owner: object().shape({
      label: string(),
      value: string().when("isDirectTenant", {
        is: () => !isDirect,
        then: string().required(t("Please choose an owner")),
        otherwise: string(),
      }),
    }),
    billingId: string()
      .max(100)
      .required()
      .test(
        "billingIdTest",
        t("Double quotes isn't allowed"),
        (value?: string) => {
          return !value?.includes('"');
        },
      ),
    markup: string().test(
      "markupTest",
      t("Only numbers from 0 to 1000 allowed"),
      (value?: string) => {
        return (
          value === "" ||
          (value !== undefined &&
            Boolean(parseFloat(value)) &&
            Number(value) >= 0 &&
            Number(value) <= 1000)
        );
      },
    ),
  });

export const editTenantSchema = (t: TFunction) =>
  object().shape({
    name: string().required(),
    billingId: string()
      .max(100)
      .required()
      .test(
        "billingIdTest",
        t("Double quotes isn't allowed"),
        (value?: string) => {
          return !value?.includes('"');
        },
      ),
    markup: string().test(
      "markupTest",
      t("Only numbers from 0 to 1000 allowed"),
      (value?: string) => {
        return (
          value === "" ||
          (value !== undefined &&
            Boolean(parseFloat(value)) &&
            Number(value) >= 0 &&
            Number(value) <= 1000)
        );
      },
    ),
  });
