import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

import { loginSchema } from "utils/schemas/loginSchema";
import { LoginFormTypes } from "utils/types/authentication";
import { publicRoutes } from "utils/constants/routes";
import loginStore from "storage/singletons/Login";
import FormInput from "components/common/Form/FormInput";
import { useFormStyles } from "./styles";
import FormCheckbox from "components/common/Form/FormCheckbox";
import { useMemo } from "react";
import ConfigStore from "storage/singletons/Config";
import { observer } from "mobx-react-lite";

const initialValues = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const classes = useFormStyles();

  const { keepUserLoggedIn } = ConfigStore;
  const { login } = loginStore;

  const defaultValues = useMemo(
    () => ({ ...initialValues, keepMeLoggedIn: keepUserLoggedIn }),
    [keepUserLoggedIn],
  );

  const { control, handleSubmit, formState, ...rest } = useForm<LoginFormTypes>(
    {
      resolver: yupResolver(loginSchema(t)),
      defaultValues,
    },
  );

  const handleChange: SubmitHandler<LoginFormTypes> = payload => {
    login(payload);
  };

  console.log(formState, rest);
  return (
    <form
      onSubmit={handleSubmit(handleChange)}
      className={classes.loginFormWrapper}
    >
      <Controller
        name="username"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Email or ID")} {...field} {...props} />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field, ...props }) => (
          <FormInput
            label={t("Password")}
            type="password"
            className={classes.loginPasswordInput}
            {...field}
            {...props}
          />
        )}
      />
      <div className={classes.loginCheckboxAndLinkWrapper}>
        <Controller
          name="keepMeLoggedIn"
          control={control}
          render={({ field, ...props }) => (
            <FormCheckbox
              label={t("Keep me logged in")}
              {...field}
              {...props}
            />
          )}
        />
        <NavLink
          to={publicRoutes.forgotPassword}
          className={classes.loginForgetPasswordLink}
        >
          {t("Forgot password")}?
        </NavLink>
      </div>
      <Button type="submit" variant="contained">
        {t("Login")}
      </Button>
    </form>
  );
};

export default observer(LoginForm);
