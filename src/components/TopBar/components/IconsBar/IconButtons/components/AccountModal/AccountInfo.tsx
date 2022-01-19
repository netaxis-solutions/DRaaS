import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import LoginStore from "storage/singletons/Login";

import { AddDistributorFormPropsType } from "utils/types/distributor";
import { profileEditSchema } from "utils/schemas/profileSchema";

import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";

import styles from "./styles";
import { Save } from "components/Icons";

const AccountInfo: React.FC<AddDistributorFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = styles();

  const { user, putUserData } = LoginStore;

  const defaultValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    mobile_number: user.mobile_number,
  };

  const { control, handleSubmit } = useForm<any>({
    resolver: yupResolver(profileEditSchema(t)),
    defaultValues,
  });

  const onSubmit: any = ({ password, confirmPassword, ...values }: any) => {
    putUserData(values);
  };

  const onCancel = () => {
    handleCancel();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.profileBox}>
        <div className={classes.boxHeader}>{t("Account information")}</div>
        <ModalButtonsWrapper
          handleCancel={onCancel}
          cancelButton
          submitButtonTitle={t("Save")}
          submitIcon={Save}
        />
        <div className={classes.userProfile}>
          {t("Profile")}: {user.ui_profile}
        </div>
        <Controller
          name="first_name"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("First name")}
              {...field}
              {...props}
              className={classes.inputField}
            />
          )}
        />
        <Controller
          name="last_name"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Last name ")}
              {...field}
              {...props}
              className={classes.inputField}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Email")}
              {...field}
              {...props}
              className={classes.inputField}
            />
          )}
        />
        <Controller
          name="mobile_number"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Mobile number")}
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
