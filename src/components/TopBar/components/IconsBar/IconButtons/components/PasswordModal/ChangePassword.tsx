import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import RightSideModal from "storage/singletons/RightSideModal";
import LoginStore from "storage/singletons/Login";

import { changePasswordSchema } from "utils/schemas/profileSchema";

import FormInput from "components/common/Form/FormInput";

import styles from "./styles";

const PasswordModal: React.FC<{ formId: string }> = ({
  formId,
}) => {
  const { t } = useTranslation();
  const classes = styles();
  const [isErrorOccured, setError] = useState(false);

  const { currentDelayedModalCloseAction } = RightSideModal;

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
      () => currentDelayedModalCloseAction(),
      () => setError(true),
    );
  };

  return (
    <form id={formId} onSubmit={handleSubmit(onSubmit)} className={classes.form}>
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
              inputProps={{ tabIndex: 1 }}
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
              inputProps={{ tabIndex: 1 }}
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
              inputProps={{ tabIndex: 1 }}
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

export default PasswordModal;
