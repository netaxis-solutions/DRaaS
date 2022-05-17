import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import PublicData from "storage/singletons/PublicData";
import MultiStepForm from "storage/singletons/MultiStepForm";

import FormSelect from "components/common/Form/FormSelect";

import { useAddLocationStyles } from "./styles";
import { Skeleton } from "@mui/material";

const defaultValues = {
  countryName: { label: "", value: "" },
};

const SelectLocationCountry: React.FC = () => {
  const { t } = useTranslation();
  const { goNext, setPreviousChoices } = MultiStepForm;
  const [isLoading, setIsLoading] = useState(true);
  const classes = useAddLocationStyles();

  const { getCountriesList } = PublicData;
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
    getCountriesList(() => {
      setIsLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countriesOptions = PublicData.countries.reduce(
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
      {isLoading ? (
        <Skeleton variant={"rectangular"} height={40} />
      ) : (
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
      )}
    </form>
  );
};

export default SelectLocationCountry;
