import { TFunction } from "i18next";
import { string, object } from "yup";

export const nameSchema = (t: TFunction) =>
  object().shape({
    firstName: string()
      .label(t("First name"))
      .trim("First name should have no leading or trailing spaces")
      .min(2, t("First name is too Short"))
      .max(7, t("First name is too Long"))
      .required(),
  });
