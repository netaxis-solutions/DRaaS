import { useTranslation } from "react-i18next";

import useStyles from "./styles";

const LoginHeader: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.loginFormHeader}>
      <img
        className={classes.loginLogoImage}
        src="/branding/default/img/signLogo.png"
        alt="logo"
      />
      <p className={classes.loginWelcomeText}>{t("Welcome to CC")}</p>
    </div>
  );
};

export default LoginHeader;
