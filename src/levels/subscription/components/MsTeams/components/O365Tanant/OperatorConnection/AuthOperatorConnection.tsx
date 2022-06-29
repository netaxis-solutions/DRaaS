import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useTranslation } from "react-i18next";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useParams } from "react-router-dom";

import CloudConnection from "storage/singletons/CloudConnection";
import PendingQueries from "storage/singletons/PendingQueries";
import { getIsLoading } from "utils/functions/getIsLoading";
import { IStartOnboardingProccessData } from "utils/types/operatorConnection";

import ButtonWithIcon from "components/common/Form/ButtonWithIcon";
import HelperText from "./HelperText";
import FormInput from "components/common/Form/FormInput";
import RadioButtonIcon from "components/common/Form/FormRadioButton/RadioButtonIcon";
import RadioButtonCheckedIcon from "components/common/Form/FormRadioButton/RadioButtonCheckedIcon";

import { OperatorConnectionStyle } from "./styles";

const defaultValues = {
  email: "",
  msTenantId: "",
  companyName: "",
};

const AuthOperatorConnection: FC = () => {
  const { t } = useTranslation();
  const { tenantID, subscriptionID } = useParams<{
    subscriptionID: string;
    tenantID: string;
  }>();
  const { byFetchType } = PendingQueries;
  const classes = OperatorConnectionStyle();

  const {
    startOperatorConnectionOnboarding,
    setError,
    setUncorrectInputData,
  } = CloudConnection;

  const [value, setValue] = useState("email");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(
      object().shape({
        email: string().email().label(t("This field")),
        msTenantId: string(),
        companyName: string(),
      }),
    ),
    defaultValues,
  });

  const onSubmit = (payload: IStartOnboardingProccessData) => {
    startOperatorConnectionOnboarding(tenantID, subscriptionID, {
      [value]: payload[value],
    });
    setUncorrectInputData(payload[value]);
  };

  const isLoading = getIsLoading(
    "@startOperatroConnectionOnboarding",
    byFetchType,
  );

  return (
    <>
      <HelperText error={CloudConnection.isError} />
      {!CloudConnection.isError ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.radioGroupWrapper}>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="email"
                className={classes.formLabel}
                control={
                  <Radio
                    icon={<RadioButtonIcon className={classes.radioButtom} />}
                    checkedIcon={
                      <RadioButtonCheckedIcon
                        className={classes.radioChecked}
                      />
                    }
                  />
                }
                label={
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, ...props }) => {
                      return (
                        <FormInput
                          required
                          disabled={
                            value === "msTenantId" || value === "companyName"
                          }
                          label={t("Email")}
                          {...field}
                          {...props}
                          className={classes.field}
                        />
                      );
                    }}
                  />
                }
              />
              <FormControlLabel
                value="msTenantId"
                className={classes.formLabel}
                control={
                  <Radio
                    icon={<RadioButtonIcon className={classes.radioButtom} />}
                    checkedIcon={
                      <RadioButtonCheckedIcon
                        className={classes.radioChecked}
                      />
                    }
                  />
                }
                label={
                  <Controller
                    name="msTenantId"
                    control={control}
                    render={({ field, ...props }) => {
                      return (
                        <FormInput
                          required
                          disabled={
                            value === "email" || value === "companyName"
                          }
                          label={t("Ms Teams")}
                          {...field}
                          {...props}
                          className={classes.field}
                        />
                      );
                    }}
                  />
                }
              />
              <FormControlLabel
                value="companyName"
                className={classes.formLabel}
                control={
                  <Radio
                    icon={<RadioButtonIcon className={classes.radioButtom} />}
                    checkedIcon={
                      <RadioButtonCheckedIcon
                        className={classes.radioChecked}
                      />
                    }
                  />
                }
                label={
                  <Controller
                    name="companyName"
                    control={control}
                    render={({ field, ...props }) => {
                      return (
                        <FormInput
                          required
                          disabled={value === "msTenantId" || value === "email"}
                          label={t("Company")}
                          {...field}
                          {...props}
                          className={classes.field}
                        />
                      );
                    }}
                  />
                }
              />
            </RadioGroup>
          </div>

          <div className={classes.buttonWrapper}>
            <ButtonWithIcon
              title={t("Link now")}
              type="submit"
              disabled={isLoading}
            />
          </div>
        </form>
      ) : (
        <div className={classes.buttonWrapper}>
          <ButtonWithIcon title={t("Try again")} onClick={() => setError()} />
        </div>
      )}
    </>
  );
};

export default observer(AuthOperatorConnection);
