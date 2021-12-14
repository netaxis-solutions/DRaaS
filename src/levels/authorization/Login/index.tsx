import { Switch, Route } from "react-router-dom";
import { useRef } from "react";
import { publicRoutes } from "utils/constants/routes";

import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import TwoFactorAuthenticationForm from "./components/TwoFactorAuthenticationForm";
import useStyles from "./styles";

const Login: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles({
    width: ref?.current?.clientWidth || 602,
    height: ref?.current?.clientHeight || 600,
  });

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginBorderForm}></div>
      <div className={classes.loginFormContainer} ref={ref}>
        <LoginHeader />
        <Switch>
          <Route exact path={publicRoutes.login} component={LoginForm} />
          <Route
            exact
            path={publicRoutes.forgotPassword}
            component={ForgotPasswordForm}
          />
          <Route
            exact
            path={publicRoutes.resetPassword}
            component={ResetPasswordForm}
          />
          <Route
            exact
            path={publicRoutes.twoFactor}
            component={TwoFactorAuthenticationForm}
          />
        </Switch>
      </div>
    </div>
  );
};

export default Login;
