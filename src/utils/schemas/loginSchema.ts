import { TFunction } from "i18next";
import { string, object } from "yup";

export const loginSchema = (t: TFunction) =>
  object().shape({
    username: string()
      .label(t("Username"))
      .trim(t("Username should have no leading or trailing spaces"))
      .required(),
  });
