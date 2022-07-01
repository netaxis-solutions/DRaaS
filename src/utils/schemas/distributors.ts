import { TFunction } from "i18next";
import { string, object } from "yup";

export const addDistributorSchema = (t: TFunction) =>
  object().shape({
    name: string()
      .max(100)
      .required()
      .test("nameTest", t("Double quotes isn't allowed"), (value?: string) => {
        return !value?.includes('"');
      }),
    billingId: string()
      .required()
      .max(100)
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

export const editDistributorSchema = (t: TFunction) =>
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
            Boolean(parseFloat(value)) &&
            Number(value) >= 0 &&
            Number(value) <= 1000)
        );
      },
    ),
  });
