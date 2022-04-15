import { TFunction } from "i18next";
import { string, object } from "yup";
import StringSchema from "yup/lib/string";

export const countrySchema = (t: TFunction) =>
  object().shape({
    countryCode: string().required(t("Please selelct a country")),
  });

export const detailsSchema = (shapeObj: { [key: string]: StringSchema }) =>
  object().shape(shapeObj);
