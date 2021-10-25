import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";

import { loginSchema } from "utils/schemas/loginSchema";
import { LoginFormTypes } from "utils/types/authentication";
import loginStore from "storage/singletons/Login";
import FormInput from "components/common/Form/FormInput";
import { useFormStyles } from "./styles";

const defaultValues = {
  username: "",
  password: ""
};

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<LoginFormTypes>({
    resolver: yupResolver(loginSchema(t)),
    defaultValues
  });
  const { login } = loginStore;
  const classes = useFormStyles();

  const handleChange: SubmitHandler<LoginFormTypes> = (payload) => {
    login(payload);
  };

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
          <FormInput label={t("Password")} {...field} {...props} />
        )}
      />
      <p className={classes.loginForgetPasswordLink}>{t("Forgot password")}?</p>
      <Button type="submit" variant="contained">
        {t("Login")}
      </Button>
    </form>
  );
};

export default LoginForm;
