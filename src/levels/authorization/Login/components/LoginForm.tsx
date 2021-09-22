import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { loginSchema } from "utils/schemas/loginSchema";
import { LoginFormTypes } from "utils/types/authentication";
import ButtonComponent from "components/common/Form/Button";
import FormInput from "components/common/Form/FormInput";

import { useFormStyles } from "./styles";

const defaultValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<LoginFormTypes>({
    resolver: yupResolver(loginSchema(t)),
    defaultValues,
  });

  const classes = useFormStyles();

  const handleChange: SubmitHandler<LoginFormTypes> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleChange)}
      className={classes.loginFormWrapper}
    >
      <Controller
        name="email"
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
      <ButtonComponent title={t("Login")} type="submit" />
    </form>
  );
};

export default LoginForm;
