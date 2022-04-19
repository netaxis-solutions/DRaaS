import { TFunction } from "i18next";
import { string, object, ref } from "yup";

export const profileEditSchema = (t: TFunction) =>
  object().shape({
    email: string().matches(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      {
        message: t("Incorrect email address"),
        excludeEmptyString: true,
      },
    ),
    mobile_number: string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
      message: t("Incorrect number"),
      excludeEmptyString: true,
    }),
  });

export const changePasswordSchema = (t: TFunction) =>
  object().shape({
    password: string().label(t("Password")).min(8),
    confirmPassword: string()
      .label(t("Confirm password"))
      .oneOf([ref("password"), null], t("Passwords must match")),
    old_password: string().required().label(t("Old password")),
  });
