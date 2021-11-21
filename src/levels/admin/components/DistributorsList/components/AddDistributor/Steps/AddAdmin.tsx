import { useTranslation } from "react-i18next";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import MultiStepForm from "storage/singletons/MultiStepForm";
import { TAddAdminValues } from "utils/types/distributors";
import FormCheckbox from "components/common/Form/FormCheckbox";
import FormInput from "components/common/Form/FormInput";
import ModalButtonsWrapper from "components/Modal/components/ModalButtonsWrapper";
import { addAdminStyles } from "./styles";

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  status: "",
  profile: "",
  password: "",
  confirmPassword: "",
  sendWelcomeEmail: false,
};

type AddDistributorFormPropsType = {
  handleCancel: () => void;
};

const AddAdmin: React.FC<AddDistributorFormPropsType> = ({ handleCancel }) => {
  const { t } = useTranslation();
  const classes = addAdminStyles();
  const { control, handleSubmit } = useForm<TAddAdminValues>({
    defaultValues,
  });
  const { goNext, goBack, setValues } = MultiStepForm;

  const onSubmit: SubmitHandler<TAddAdminValues> = payload => {
    goNext();
    setValues(payload);
  };
  const onCancel = () => {
    goBack(handleCancel);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalButtonsWrapper
        handleCancel={onCancel}
        cancelButton
        cancelButtonTitle={t("Back")}
        submitButtonTitle={t("Add")}
      />
      <div className={classes.addAdminForm}>
        <div className={classes.addAdminFormPart}>
          <span className={classes.addAdminFormPartTitle}>
            {t("Main information")}
          </span>
          <Controller
            name="firstName"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("First name")}
                {...field}
                {...props}
                className={classes.addAdminInput}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Last name")}
                {...field}
                {...props}
                className={classes.addAdminInput}
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
                className={classes.addAdminInput}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Mobile number")}
                {...field}
                {...props}
                className={classes.addAdminInput}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Status")}
                {...field}
                {...props}
                className={classes.addAdminInput}
              />
            )}
          />
          <Controller
            name="profile"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Status")}
                {...field}
                {...props}
                className={classes.addAdminInput}
              />
            )}
          />
        </div>
        <div className={classes.addAdminFormPart}>
          <span className={classes.addAdminFormPartTitle}>{t("Password")}</span>
          <Controller
            name="sendWelcomeEmail"
            control={control}
            render={({ field, ...props }) => (
              <FormCheckbox
                label={t("Send welcome email")}
                className={classes.addAdminInput}
                {...field}
                {...props}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, ...props }) => (
              <FormInput
                label={t("Password")}
                {...field}
                {...props}
                className={classes.addAdminInput}
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
                className={classes.addAdminInput}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default AddAdmin;
