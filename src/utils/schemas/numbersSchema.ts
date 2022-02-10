import { string, object } from "yup";

export const numbersRangeSchema = (selectedName: number) =>
  object().shape({
    rangeSize: string()
      .required("")
      .test("name", "", (value?: string) => selectedName >= Number(value)),
    suggestionsAmount: string(),
  });
