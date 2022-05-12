import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import PublicData from "storage/singletons/PublicData";
import MultiStepForm from "storage/singletons/MultiStepForm";

import FormSelect from "components/common/Form/FormSelect";

import { useAddLocationStyles } from "./styles";

const defaultValues = {
  countryName: { label: "", value: "" },
};

const SelectLocationCountry: React.FC = () => {
  const { t } = useTranslation();
  const { goNext, setPreviousChoices } = MultiStepForm;
  const classes = useAddLocationStyles();

  const { countries, getCountriesList } = PublicData;
  const { control, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(
      object().shape({
        countryName: object().shape({
          label: string(),
          value: string().required(t("Select a country")),
        }),
      }),
    ),
  });

  const onSubmit = ({
    countryName: { value },
  }: {
    countryName: { value: string };
  }) => {
    setPreviousChoices({ selectedCountryName: value });
    goNext();
  };

  useEffect(() => {
    getCountriesList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countriesOptions = countries.reduce(
    (countriesList: Array<{ label: string; value: string }>, { name }) => [
      ...countriesList,
      { label: name, value: name },
    ],
    [],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classes.formWrapper}
      id={"addLocation"}
    >
      <Controller
        name="countryName"
        control={control}
        render={({ field, ...props }) => (
          <FormSelect
            label={t("Select a country")}
            options={countriesOptions}
            {...field}
            {...props}
          />
        )}
      />
    </form>
  );
};

export default SelectLocationCountry;
