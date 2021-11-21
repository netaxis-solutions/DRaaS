import { TFunction } from "i18next";
import { string, object } from "yup";

export const addDistributorSchema = (t: TFunction) =>
  object().shape({
    name: string().required(t("Please fill this field")),
    billingId: string().matches(/^[aA-zZ0-9\s]+$/, {
      message:
        "Use only letters and digits, don’t use special characters (e.g. *,%,#)",
      excludeEmptyString: true,
    }),
    markup: string().matches(/^[0-9\s]+$/, {
      message: "Only numbers and white space allowed",
      excludeEmptyString: true,
    }),
  });
