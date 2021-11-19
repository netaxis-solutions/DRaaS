import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";

import { resetPasswordSchema } from "utils/schemas/loginSchema";
import { ResetPasswordTypes } from "utils/types/authentication";
import loginStore from "storage/singletons/Login";
import RoutingStore from "storage/singletons/RoutingConfig";
import PendingQueries from "storage/singletons/PendingQueries";
import FormInput from "components/common/Form/FormInput";
import { useFormStyles } from "./styles";

const defaultValues = {
  password: "",
  confirmPassword: "",
};

const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { control, handleSubmit, reset } = useForm<ResetPasswordTypes>({
    resolver: yupResolver(resetPasswordSchema(t)),
    defaultValues,
  });
  const { resetPassword } = loginStore;
  const { history } = RoutingStore;
  const { empty } = PendingQueries;
  const classes = useFormStyles();

  const handleChange: SubmitHandler<ResetPasswordTypes> = payload => {
    const callback = () => {
      reset(defaultValues);
    };
    const successCallback = () => {
      history.push("/login");
    };
    resetPassword(
      payload,
      location.pathname.match(/([^/]+$)/)![0],
      callback,
      successCallback,
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleChange)}
      className={classes.loginFormWrapper}
    >
      <Controller
        name="password"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Password")}
            type="password"
            {...field}
            {...props}
          />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Confirm password")}
            type="password"
            {...field}
            {...props}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!empty}
        className={classes.resetButton}
      >
        {t("Reset")}
      </Button>
    </form>
  );
};

export default observer(ResetPasswordForm);
