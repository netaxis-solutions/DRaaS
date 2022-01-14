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
    email: string().matches(
      /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
      {
        message: "Incorrect email address",
        excludeEmptyString: true,
      },
    ),
    mobile_number: string().matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, {
      message: "Incorrect number",
      excludeEmptyString: true,
    }),
  });
