//@ts-nocheck
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import MultiStepForm from "storage/singletons/MultiStepForm";

import FormSelect from "components/common/Form/FormSelect";

import { numbersRangeSchema } from "utils/schemas/numbersSchema";
import { useEffect } from "react";
import { countryStyles } from "../../../styles";
import PortingRequests from "storage/singletons/PortingRequests";

type defaultValuesType = {
  rangeSize: string;
  suggestionsAmount: string;
};

const defaultValues: defaultValuesType = {
  rangeSize: "1",
  suggestionsAmount: "1",
};

const Country: React.FC = () => {
  const { t } = useTranslation();
  const { setPreviousChoices, goNext } = MultiStepForm;
  const classes = countryStyles();

  const { control, handleSubmit, setValue } = useForm<defaultValuesType>({
    defaultValues,
  });
  const { portingRequirements } = PortingRequests;

  const countries = portingRequirements.map(requirement => ({
    label: requirement.name,
    value: requirement.name,
    image: <i>{requirement.id}_flag</i>,
  }));
  useEffect(() => {}, []);
  const onSubmit = (values: defaultValuesType) => {
    // setPreviousChoices({ suggestionsSetting: values });
    goNext();
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      <div>Country</div>
      <div>
        Select the country for which you would like to intiate a port request.
        All supported countries can be found in the list below
      </div>
      {
        <Controller
          name="owner"
          control={control}
          render={({ field, ...props }) => (
            <FormSelect
              label={t("Country")}
              options={countries}
              customRenderOptions
              {...field}
              {...props}
              className={classes.countrySelect}
              onChange={props => {
                console.log(props);
                setValue(props?.value || "");
              }}
            />
          )}
        />
      }
    </form>
  );
};

export default observer(Country);
