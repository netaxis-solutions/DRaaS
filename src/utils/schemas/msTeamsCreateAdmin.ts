import { TFunction } from "i18next";
import { string, object, boolean } from "yup";

export const msTeamCreateAdmin = (t: TFunction) =>
  object().shape({
    msUsername: string()
      .required()
      .matches(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        {
          message: t(
            "Incorrect MSTeam account and user should enter @example.domain",
          ),
          excludeEmptyString: true,
        },
      ),
    agree: boolean()
      .required(t("The terms and conditions must be accepted."))
      .oneOf([true], t("Field must be checked")),
    privacy: boolean()
      .required(t("The terms and conditions must be accepted."))
      .oneOf([true], t("Field must be checked")),
    msPassword: string()
      .label(t("Password"))
      .max(25)
      .when(t("Password"), {
        is: (value: any) => value !== "",
        then: string().min(5),
        otherwise: s => s.notRequired(),
      }),
  });
