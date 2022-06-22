import { TFunction } from "i18next";
import { string, object, boolean } from "yup";

export const addLocationSchema = (t: TFunction) =>
  object().shape({
    postalCodeId: object().shape({
      label: string(),
      value: string().required(t("This field is mandatory")),
    }),
    street: string()
      .matches(/^[aA-zZ0-9\s]+$/, {
        message: t("Use only letters and digits"),
        excludeEmptyString: true,
      })
      .required(t("This field is mandatory")),
    number: string()
      .matches(/^[aA-zZ0-9\s]+$/, {
        message: t("Use only letters and digits"),
        excludeEmptyString: true,
      })
      .required(t("This field is mandatory")),
    postbox: string().matches(/^[aA-zZ0-9\s]+$/, {
      message: t("Use only letters and digits"),
      excludeEmptyString: true,
    }),
    agreement: boolean()
      .required()
      .oneOf(
        [true],
        t("Please, confirm that it is your legitimate business location"),
      ),
  });
