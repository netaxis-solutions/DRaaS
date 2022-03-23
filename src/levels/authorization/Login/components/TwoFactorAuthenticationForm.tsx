import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Button from "@material-ui/core/Button";

import { twoFactorSchema } from "utils/schemas/loginSchema";
import { TTwoFactorAuthentication } from "utils/types/authentication";
import loginStore from "storage/singletons/Login";
import FormInput from "components/common/Form/FormInput";
import FormCheckbox from "components/common/Form/FormCheckbox";

import { useFormStyles } from "./styles";

const defaultValues = {
  code: "",
  trust: false,
};

const TwoFactorAuthenticationForm: React.FC = () => {
  const { t } = useTranslation();
  const { sendTwoFactorCode } = loginStore;

  const { control, handleSubmit } = useForm<TTwoFactorAuthentication>({
    resolver: yupResolver(twoFactorSchema(t)),
    defaultValues,
  });
  const classes = useFormStyles();

  const handleChange: SubmitHandler<TTwoFactorAuthentication> = payload => {
    sendTwoFactorCode(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(handleChange)}
      className={classes.loginFormWrapper}
    >
      <p className={classes.twoFactorHelperMessage}>
        {`${t("We are trying to log in from a new device")}. ${t(
          "We have sent a code to your email for safety, please enter it below",
        )} :`}
      </p>
      <Controller
        name="code"
        control={control}
        render={({ field, ...props }) => (
          <FormInput label={t("Code")} {...field} {...props} />
        )}
      />
      <Controller
        name="trust"
        control={control}
        render={({ field, ...props }) => (
          <FormCheckbox label={t("Trust this device")} {...field} {...props} />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        className={classes.twoFactorSubmit}
      >
        {t("Submit")}
      </Button>
    </form>
  );
};

export default observer(TwoFactorAuthenticationForm);
