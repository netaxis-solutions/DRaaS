import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import MultiStepForm from "storage/singletons/MultiStepForm";
import { countrySchema } from "utils/schemas/numbersPorting";
import PortingRequests from "storage/singletons/PortingRequests";

import FormSelectWithFlags from "components/common/Form/FormSelect/FormSelectWithFlags";
import Flag from "components/common/Flag";

import { countryStyles } from "../styles";

type defaultValuesType = { countryCode: string };

const defaultValues: defaultValuesType = {
  countryCode: "",
};

const Country: React.FC = () => {
  const { t } = useTranslation();

  const { setPreviousChoices, goNext } = MultiStepForm;
  const classes = countryStyles();

  const { control, handleSubmit, setValue } = useForm<defaultValuesType>({
    resolver: yupResolver(countrySchema(t)),
    defaultValues,
  });
  const { portingRequirements } = PortingRequests;

  const countries = portingRequirements.map(requirement => ({
    label: requirement.name,
    value: requirement.id,
    image: <Flag countryCode={requirement.id} />,
  }));
  useEffect(() => {}, []);
  const onSubmit = (values: defaultValuesType) => {
    setPreviousChoices({
      country: portingRequirements.find(
        requirement => requirement.id === values.countryCode,
      ),
    });
    goNext();
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.countryHeader}>{t("Country")}</div>
      <div className={classes.countryDescription}>
        {t(
          "Select the country for which you would like to intiate a port request",
        )}
        .{t("All supported countries can be found in the list below")}
      </div>
      {
        <Controller
          name="countryCode"
          control={control}
          render={({ field, ...props }) => (
            <FormSelectWithFlags
              label={t("Country")}
              options={countries}
              {...field}
              {...props}
              className={classes.countrySelect}
              onChange={(props: any) => {
                setValue("countryCode", props?.value || "");
              }}
            />
          )}
        />
      }
    </form>
  );
};

export default observer(Country);
