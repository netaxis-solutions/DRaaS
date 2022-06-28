import { TFunction } from "i18next";
import { string, object } from "yup";

import RoutingConfig from "storage/singletons/RoutingConfig";

export const addResellerSchema = (t: TFunction) =>
  object().shape({
    name: string()
      .required(t("Please fill this field"))
      .matches(/^[aA-zZ0-9\s]+$/, {
        message: t("Use only letters and digits"),
        excludeEmptyString: true,
      }),
    distributor: object().shape({
      label: string(),
      value: string().when("name", {
        is: (_: string) => RoutingConfig.loggedInUserLevel === "system",
        then: string().required(t("Please choose a distributor")),
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

export const editResellerSchema = (t: TFunction) =>
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
