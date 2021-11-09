import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";

import useStyles from "./styles";

const LoginHeader: React.FC = () => {
  const location = useLocation();
  const classes = useStyles();
  const { t } = useTranslation();

  const title =
    (location.pathname === "/login" && t("Welcome to CC")) ||
    (location.pathname === "/forgotPassword" && t("Forgot password?"));

  return (
    <div className={classes.loginFormHeader}>
      <img
        className={classes.loginLogoImage}
        src="/branding/default/img/signLogo.png"
        alt="logo"
      />
      <p className={classes.loginWelcomeText}>{title}</p>
    </div>
  );
};

export default LoginHeader;
