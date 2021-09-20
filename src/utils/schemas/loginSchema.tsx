import { TFunction } from "i18next";
import { string, object } from "yup";

export const loginSchema = (t: TFunction) =>
  object().shape({
    email: string()
      .label(t("Email"))
      .trim("Email should have no leading or trailing spaces")
      .required(),
  });
