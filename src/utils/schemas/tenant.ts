import { TFunction } from "i18next";
import { string, object, boolean } from "yup";

export const addTenantSchema = (t: TFunction, isDirect?: boolean) =>
  object().shape({
    name: string()
      .max(100)
      .required()
      .test("nameTest", t("Double quotes isn't allowed"), (value?: string) => {
        return !value?.includes('"');
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
            Boolean(parseFloat(value) || parseFloat(value) === 0) &&
            Number(value) >= 0 &&
            Number(value) <= 1000)
        );
      },
    ),
  });

export const editTenantSchema = (t: TFunction) =>
  object().shape({
    name: string()
      .max(100)
      .required()
      .test("nameTest", t("Double quotes isn't allowed"), (value?: string) => {
        return !value?.includes('"');
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
            Boolean(parseFloat(value) || parseFloat(value) === 0) &&
            Number(value) >= 0 &&
            Number(value) <= 1000)
        );
      },
    ),
  });
