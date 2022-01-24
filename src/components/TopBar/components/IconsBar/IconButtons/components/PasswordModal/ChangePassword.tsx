import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import LoginStore from "storage/singletons/Login";

import { AddDistributorFormPropsType } from "utils/types/distributor";
import { changePasswordSchema } from "utils/schemas/profileSchema";

import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { Save } from "components/Icons";

import styles from "./styles";

const AccountInfo: React.FC<AddDistributorFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = styles();
  const [isErrorOccured, setError] = useState(false);

  const { changePassword } = LoginStore;

  const defaultValues = {
    old_password: "",
    password: "",
    confirmPassword: "",
  };

  const { control, handleSubmit } = useForm<any>({
    resolver: yupResolver(changePasswordSchema(t)),
    defaultValues,
  });

  const onSubmit: any = ({ confirmPassword, ...payload }: any) => {
    changePassword(
      payload,
      () => handleCancel(),
      () => setError(true),
    );
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <ModalButtonsWrapper
        handleCancel={onCancel}
        cancelButton
        submitButtonTitle={t("Save")}
        submitIcon={Save}
      />
      <div className={classes.profileBox}>
        <div className={classes.boxHeader}>{t("Password")}</div>
        <Controller
          name="old_password"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Old password")}
              type={"password"}
              error={isErrorOccured || props.fieldState.error}
              helperText={
                (isErrorOccured && t("Wrong old password")) ||
                props.fieldState.error?.message
              }
              {...field}
              {...props}
              className={classes.inputField}
            />
          )}
        />
        {isErrorOccured && t("Wrong old password")}
        <Controller
          name="password"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Password")}
              type={"password"}
              {...field}
              {...props}
              className={classes.inputField}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Confirm password")}
              type={"password"}
              {...field}
              {...props}
              className={classes.inputField}
            />
          )}
        />
      </div>
    </form>
  );
};

export default AccountInfo;
