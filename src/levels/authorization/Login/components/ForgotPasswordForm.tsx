import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { observer } from "mobx-react-lite";

import { loginSchema } from "utils/schemas/loginSchema";
import { ForgotPasswordTypes } from "utils/types/authentication";
import loginStore from "storage/singletons/Login";
import PendingQueries from "storage/singletons/PendingQueries";
import FormInput from "components/common/Form/FormInput";
import { useFormStyles } from "./styles";

const defaultValues = {
  username: "",
};

const ForgotPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<ForgotPasswordTypes>({
    resolver: yupResolver(loginSchema(t)),
    defaultValues,
  });
  const { forgotPassword, isForgotPasswordNotificationShown } = loginStore;
  const { empty } = PendingQueries;
  const classes = useFormStyles();

  const handleChange: SubmitHandler<ForgotPasswordTypes> = payload => {
    forgotPassword(payload);
  };

  return (
    <>
      <p className={classes.forgotPasswordText}>
        {t(
          "Submit your username and we’ll send you a link to reset your password",
        )}
      </p>
      {isForgotPasswordNotificationShown && (
        <div className={classes.forgotPasswordNotificationContainer}>
          <span className={classes.forgotPasswordNotificationText}>
            {t("Link was successfully send to your email!")}
          </span>
        </div>
      )}
      <form
        onSubmit={handleSubmit(handleChange)}
        className={classes.loginFormWrapper}
      >
        <Controller
          name="username"
          control={control}
          render={({ field, ...props }) => (
            <FormInput label={t("Username")} {...field} {...props} />
          )}
        />
        <Button type="submit" variant="contained" disabled={!empty}>
          {t("Send me a link")}
        </Button>
      </form>
    </>
  );
};

export default observer(ForgotPasswordForm);
