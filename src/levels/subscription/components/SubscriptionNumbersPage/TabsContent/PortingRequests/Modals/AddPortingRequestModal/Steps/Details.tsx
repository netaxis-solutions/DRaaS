import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import MultiStepForm from "storage/singletons/MultiStepForm";

import FormInput from "components/common/Form/FormInput";

import { detailsStyles } from "../../../styles";

type defaultValuesType = {
  rangeSize: string;
  suggestionsAmount: string;
};

type InputsType = Array<{
  section: string;
  parameters: {
    name: string;
    type: string;
    mandatory: boolean;
  }[];
}>;

const replaceDots = (string: string) => {
  return string.replace(/\.+/g, "_");
};

const getMinimalDate = () => {
  const currentDate = new Date();
  const minimalDate = currentDate.setDate(currentDate.getDate() + 5);
  return new Date(minimalDate).toISOString().split("T")[0];
};

const Details: React.FC = () => {
  const { t } = useTranslation();
  const { previousChoices, setPreviousChoices, goNext } = MultiStepForm;
  const classes = detailsStyles();

  const inputs: InputsType = previousChoices[0]?.country?.inputs;

  const { control, handleSubmit } = useForm();

  useEffect(() => {}, []);
  const onSubmit = (values: defaultValuesType) => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(value => value[1]),
    );
    setPreviousChoices({
      details: {
        ...filteredValues,
        dueDate: filteredValues.dueDate + "T00:00:00.000Z",
      },
    });
    goNext();
  };

  return (
    <form id={"CreatePortingRequest"} onSubmit={handleSubmit(onSubmit)}>
      {inputs.map(input => (
        <div className={classes.section}>
          <div className={classes.sectionTitle}>
            {t(`dynamic:${input.section}_title`)}
          </div>
          <div className={classes.sectionDescription}>
            {t(`dynamic:${input.section}_description`)}
          </div>
          <div className={classes.inputField}>
            {input.parameters.map(parameter => (
              <Controller
                name={parameter.name}
                control={control}
                rules={{
                  required: parameter.mandatory,
                  pattern:
                    parameter.name === "contactEmail"
                      ? /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
                      : / */,
                }}
                render={({ field, ...props }) =>
                  parameter.type.toLocaleLowerCase() === "date" ? (
                    <FormInput
                      label={t(`dynamic:${replaceDots(parameter.name)}_label`)}
                      type="date"
                      inputProps={{ min: getMinimalDate() }}
                      labelShrink
                      {...field}
                      {...props}
                    />
                  ) : (
                    <FormInput
                      label={t(`dynamic:${replaceDots(parameter.name)}_label`)}
                      type={parameter.type}
                      {...field}
                      {...props}
                    />
                  )
                }
              />
            ))}
          </div>
        </div>
      ))}
    </form>
  );
};

export default observer(Details);
