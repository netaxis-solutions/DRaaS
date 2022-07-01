import { TFunction } from "i18next";
import { string, object } from "yup";

export const addSubscriptionSchema = (t: TFunction) =>
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
  });
