// import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
// import clsx from "clsx";
import LoginStore from "storage/singletons/Login";

// import { addDistributorSchema } from "utils/schemas/distributors";
import { AddDistributorFormPropsType } from "utils/types/distributor";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { profileEditSchema } from "utils/schemas/profileSchema";
// import { Percent } from "components/Icons";

import styles from "./styles";

const AccountInfo: React.FC<AddDistributorFormPropsType> = ({
  handleCancel,
}) => {
  const { t } = useTranslation();
  const classes = styles();
  //@ts-ignore
  const { user, putUserData } = LoginStore;
  const defaultValues = {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    mobile_number: user.mobile_number,
    password: "",
    confirmPassword: "",
  };

  const { control, handleSubmit } = useForm<any>({
    resolver: yupResolver(profileEditSchema(t)),
    defaultValues,
  });
  //@ts-ignore
  const onSubmit: any = ({ password, confirmPassword, ...values }: any) => {
    console.log(values, "asdasdasdasd");
    putUserData(values);
    if (password) {
      putUserData({ password });
    }
  };

  const onCancel = () => {
    handleCancel();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <div className={classes.profileBox}>
        <div className={classes.boxHeader}>Account information</div>
        <ModalButtonsWrapper
          handleCancel={onCancel}
          cancelButton
          submitButtonTitle={t("Add")}
        />
        <div className={classes.userProfile}>Profile: {user.ui_profile}</div>
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
      <div className={classes.profileBox}>
        <div className={classes.boxHeader}>Password</div>
        <Controller
          name="password"
          control={control}
          render={({ field, ...props }) => (
            <FormInput
              label={t("Password")}
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
