import { TFunction } from "i18next";
import { string, object, ref } from "yup";

export const profileEditSchema = (t: TFunction) =>
  object().shape({
    password: string()
      .label(t("Password"))
      .when("confirmPassword", {
        is: (value: any) => value !== "",
        then: string().min(8),
        otherwise: s => s.notRequired(),
      }),
    confirmPassword: string()
      .label(t("Confirm password"))
      .oneOf([ref("password"), null], "Passwords must match"),
  });
