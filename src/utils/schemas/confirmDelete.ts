import { TFunction } from "i18next";
import { string, object } from "yup";

export const confirmDelete = (t: TFunction, selectedName: string) =>
  object().shape({
    name: string().oneOf([selectedName], t("Enter valid name")),
  });
