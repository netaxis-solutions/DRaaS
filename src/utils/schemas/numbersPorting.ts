import { string, object } from "yup";
import StringSchema from "yup/lib/string";

export const countrySchema = () =>
  object().shape({
    countryCode: string().required("Please selelct a country"),
  });

export const detailsSchema = (shapeObj: { [key: string]: StringSchema }) =>
  object().shape(shapeObj);
