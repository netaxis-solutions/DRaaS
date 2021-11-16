import { TFunction } from "i18next";
import { string, object, ref } from "yup";

export const loginSchema = (t: TFunction) =>
  object().shape({
    username: string()
      .label(t("Username"))
      .trim(t("Username should have no leading or trailing spaces"))
      .required(),
  });

export const resetPasswordSchema = (t: TFunction) =>
  object().shape({
    password: string().label(t("Password")).required(),
    confirmPassword: string()
      .label(t("Confirm password"))
      .oneOf([ref("password"), null], "Passwords must match")
      .required(),
  });
