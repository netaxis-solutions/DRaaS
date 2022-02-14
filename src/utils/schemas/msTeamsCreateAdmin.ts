import { TFunction } from "i18next";
import { string, object } from "yup";

export const msTeamCreateAdmin = (t: TFunction) =>
  object().shape({
    msUsername: string()
      .required()
      .matches(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
        {
          message: t("Incorrect msTeam account. Need add @example.domen"),
          excludeEmptyString: true,
        },
      ),
    msPassword: string()
      .label(t("Password"))
      .when(t("Password"), {
        is: (value: any) => value !== "",
        then: string().min(8),
        otherwise: s => s.notRequired(),
      }),
  });
