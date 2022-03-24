import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";

import NumbersStore from "storage/singletons/Numbers";
import MultiStepForm from "storage/singletons/MultiStepForm";

import { numbersRangeSchema } from "utils/schemas/numbersSchema";

import FormInput from "components/common/Form/FormInput";
import Tooltip from "components/Tooltip";
import { InfoIcon } from "components/Icons";

import { useRangeSettingsStyles } from "./styles";

type defaultValuesType = {
  rangeSize: string;
  suggestionsAmount: string;
};

const defaultValues: defaultValuesType = {
  rangeSize: "1",
  suggestionsAmount: "1",
};

const RangeSettings: React.FC = () => {
  const { t } = useTranslation();
  const classes = useRangeSettingsStyles();
  const { previousChoices, setPreviousChoices, goNext } = MultiStepForm;
  const { getNumberSuggestions } = NumbersStore;
  const {
    numbersRange: { rangeStart, rangeEnd, countryCode },
  } = previousChoices[1];

  const maxAmount =
    previousChoices[0].entitlements.entitlement -
    previousChoices[0].entitlements.assigned;

  const { control, handleSubmit } = useForm<defaultValuesType>({
    resolver: yupResolver(numbersRangeSchema(maxAmount)),
    defaultValues,
  });

  const onSubmit = (values: defaultValuesType) => {
    setPreviousChoices({ suggestionsSetting: values });

    getNumberSuggestions(
      {
        numberType: previousChoices[0].entitlements.numberType,
        countryCode: previousChoices[0].entitlements.countryCode,
        rangeSize: `${values.rangeSize}`,
        numberOfResults: `${values.suggestionsAmount || 1}`,
      },
      goNext,
    );
  };

  return (
    <form
      id={"SelectFromInventory"}
      onSubmit={handleSubmit(onSubmit)}
      className={classes.rangeSettingsForm}
    >
      <div>
        {t("You want to select numbers from")}{" "}
        <span className={classes.boldText}>
          {countryCode}
          {rangeStart}
        </span>{" "}
        {t("to")}{" "}
        <span className={classes.boldText}>
          {countryCode}
          {rangeEnd}
        </span>
      </div>
      <div>
        {t("Amount of the numbers you can still select of this type is")}{" "}
        <span className={classes.boldText}>{maxAmount}</span>
      </div>
      <div className={classes.textWithInput}>
        <span>
          <div>
            {t("Range size")}{" "}
            <Tooltip
              placement="right"
              title={t(
                "The larger the range, the smaller the chance you will find a match",
              )}
            >
              <InfoIcon className={classes.tooltipIcon} />
            </Tooltip>
            <span className={classes.grayText}>
              ({maxAmount} {t("max")})
            </span>
          </div>
        </span>
        <Controller
          name="rangeSize"
          control={control}
          render={({ field, ...props }) => (
            <FormInput {...field} {...props} className={classes.input} />
          )}
        />
      </div>
      <div className={classes.textWithInput}>
        <div className={classes.text}>
          {t("How many suggestions do you want?")}
        </div>
        <Controller
          name="suggestionsAmount"
          control={control}
          render={({ field, ...props }) => (
            <FormInput {...field} {...props} className={classes.input} />
          )}
        />
      </div>
    </form>
  );
};

export default observer(RangeSettings);
