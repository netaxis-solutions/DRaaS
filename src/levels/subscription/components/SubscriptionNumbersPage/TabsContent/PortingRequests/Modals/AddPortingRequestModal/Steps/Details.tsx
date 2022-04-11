//@ts-nocheck
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { string, object } from "yup";

import MultiStepForm from "storage/singletons/MultiStepForm";

import FormSelect from "components/common/Form/FormSelect";

import { detailsSchema } from "utils/schemas/numbersPorting";
import { useEffect } from "react";
import { detailsStyles } from "../../../styles";
import PortingRequests from "storage/singletons/PortingRequests";
import FormInput from "components/common/Form/FormInput";
import { TextField } from "@material-ui/core";
import { merge, replace } from "lodash";

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

// const createNestedObject = (
//   objectKeys: Array<string>,
//   isMandatory: boolean,
// ) => {
//   // const depth = objectKeys.length;
//   // const resultingObject = {};
//   // let lastObjectLink = null;
//   // for (let level = 0; level < depth; level++) {
//   //   lastObjectLink = resultingObject[lastObjectLink || objectKeys[level]] =
//   //     level === depth
//   //       ? isMandatory
//   //         ? string().required("please fill this field")
//   //         : string()
//   //       : {};
//   // }
//   // return resultingObject;

//   let a = {
//     [objectKeys[objectKeys.length - 1]]: isMandatory
//       ? string().required("please fill this field")
//       : string(),
//   };

//   for (let index = objectKeys.length - 2; index >= 0; index--) {
//     a = { [objectKeys[index]]: a };
//     console.log(a);
//   }

//   return a;
// };

const defaultValues: defaultValuesType = {};

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
  // const detailsSchemaTemplate = inputs
  //   .reduce(
  //     (parameters, currentInput) => [...parameters, ...currentInput.parameters],
  //     [],
  //   )
  //   .reduce((schema, currentInput) => {
  //     const levels = currentInput.name.split(".");
  //     const currentObject = createNestedObject(levels, currentInput.mandatory);
  //     return merge(schema, currentObject);
  //   }, {})
  //   .reduce((schema, currentInput) => {
  //     return Object.keys(currentInput).some(
  //       element => element !== "StringSchema",
  //     )
  //       ? object.shape(currentInput)
  //       : { ...schema, currentInput };
  //   }, {});
  // console.log(detailsSchemaTemplate);
  const { control, handleSubmit } = useForm<defaultValuesType>({
    defaultValues,
  });

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
                rules={{ required: parameter.mandatory }}
                render={({ field, ...props }) =>
                  parameter.type.toLocaleLowerCase() === "date" ? (
                    <FormInput
                      label={t(`dynamic:${replaceDots(parameter.name)}_label`)}
                      type="date"
                      inputProps={{ min: getMinimalDate() }}
                      labelShrink
                      {...field}
                      {...props}
                      className={classes.countrySelect}
                    />
                  ) : (
                    <FormInput
                      label={t(`dynamic:${replaceDots(parameter.name)}_label`)}
                      type={parameter.type}
                      {...field}
                      {...props}
                      className={classes.countrySelect}
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
