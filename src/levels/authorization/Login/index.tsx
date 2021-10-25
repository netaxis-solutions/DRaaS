import { useRef } from "react";

import LoginForm from "./components/LoginForm";
import LoginHeader from "./components/LoginHeader";
import useStyles from "./styles";

const Login: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const classes = useStyles({
    width: ref?.current?.clientWidth || 600,
    height: ref?.current?.clientHeight || 600
  });

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginBorderForm}></div>
      <div className={classes.loginFormContainer} ref={ref}>
        <LoginHeader />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
