import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { string, object } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Skeleton } from "@mui/material";

import PublicData from "storage/singletons/PublicData";
import MultiStepForm from "storage/singletons/MultiStepForm";

import FormSelectWithFlags from "components/common/Form/FormSelect/FormSelectWithFlags";
import Flag from "components/common/Flag";

import { useAddLocationStyles } from "./styles";

const defaultValues = {
  countryName: "",
};

const SelectLocationCountry: React.FC = () => {
  const { t } = useTranslation();
  const { goNext, setPreviousChoices } = MultiStepForm;
  const [isLoading, setIsLoading] = useState(true);
  const classes = useAddLocationStyles();

  const { getCountriesList } = PublicData;
  const { control, handleSubmit, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(
      object().shape({
        countryName: string(),
      }),
    ),
  });

  const onSubmit = ({ countryName }: { countryName: string }) => {
    setPreviousChoices({ selectedCountryName: countryName });
    goNext();
  };

  useEffect(() => {
    getCountriesList(() => {
      setIsLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const countriesOptions = PublicData.countries
    .filter(({ isoCode }) => isoCode === "NL")
    .reduce(
      (
        countriesList: Array<{
          label: string;
          value: string;
          image: JSX.Element;
        }>,
        { name, isoCode },
      ) => [
        ...countriesList,
        { label: name, value: isoCode, image: <Flag countryCode={isoCode} /> },
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
            <FormSelectWithFlags
              label={t("Select a country")}
              options={countriesOptions}
              {...field}
              {...props}
              onChange={(props: any) => {
                setValue("countryName", props?.value);
              }}
            />
          )}
        />
      )}
    </form>
  );
};

export default SelectLocationCountry;
