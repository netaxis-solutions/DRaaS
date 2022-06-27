import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useParams } from "react-router-dom";

import CloudConnection from "storage/singletons/CloudConnection";
import PendingQueries from "storage/singletons/PendingQueries";
import { getIsLoading } from "utils/functions/getIsLoading";

import { StrokeSuccessCircle } from "components/Icons";
import FormInput from "components/common/Form/FormInput";
import ButtonWithIcon from "components/common/Form/ButtonWithIcon";

import { OperatorConnectionStyle } from "./styles";

const defaultValues = {
  code: "",
};

const ConfirmCode: FC = () => {
  const { t } = useTranslation();
  const classes = OperatorConnectionStyle();
  const { tenantID, subscriptionID } = useParams<{
    subscriptionID: string;
    tenantID: string;
  }>();
  const { byFetchType } = PendingQueries;
  const { unlinkOperatorConnection, sendShortCode } = CloudConnection;

  const { control, handleSubmit } = useForm<any>({
    resolver: yupResolver(
      object().shape({
        code: string(),
      }),
    ),
    defaultValues,
  });

  const onSubmit = (payload: any) => {
    sendShortCode(tenantID, subscriptionID, payload);
  };

  const isLoading =
    getIsLoading("@unlinkOperatorConnection", byFetchType) ||
    getIsLoading("@sendShortCode", byFetchType);

  return (
    <>
      <div className={classes.textWithIcon}>
        <StrokeSuccessCircle />
        <span className={classes.boldText}>
          {t("Great! We found your tenant!")}
        </span>
      </div>
      <div className={classes.shortCodeTextWrapper}>
        {`${t("To make really sure, we sent a ")}`}
        <span className={classes.boldText}>{t("confirmation code ")}</span>
        {t("to your e-mail")}
        {". "}
        {t("Please, enter the code below to finalize the initial setup")}.
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.shortCodeForm}>
        <Controller
          name="code"
          control={control}
          render={({ field, ...props }) => {
            return (
              <FormInput
                required
                label={t("Code")}
                {...field}
                {...props}
                className={classes.shortCodeField}
              />
            );
          }}
        />
        <div>
          <ButtonWithIcon
            title={t("Confirm")}
            type="submit"
            disabled={isLoading}
          />
          <ButtonWithIcon
            className={classes.cancelButton}
            title={t("Cancel")}
            disabled={isLoading}
            onClick={() => unlinkOperatorConnection(tenantID, subscriptionID)}
          />
        </div>
      </form>
    </>
  );
};

export default ConfirmCode;
