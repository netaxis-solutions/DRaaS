import { TFunction } from "i18next";
import { string, object } from "yup";

export const addDistributorSchema = (t: TFunction) =>
  object().shape({
    name: string().required(t("Please fill this field")),
    billingId: string().matches(/^[aA-zZ0-9\s]+$/, {
      message: " ",
      excludeEmptyString: true,
    }),
    markup: string().matches(/^[0-9\s]+$/, {
      message: " ",
      excludeEmptyString: true,
    }),
  });
