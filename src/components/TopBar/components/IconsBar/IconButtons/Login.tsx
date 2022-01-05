import { useState } from "react";
import AppMenu from "@material-ui/core/Menu";

import LoginStore from "storage/singletons/Login";

import { Login } from "components/Icons";

import useStyles from "../styles";

const LoginButton: React.FC = () => {
  const classes = useStyles();
  //@ts-ignore
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = LoginStore;
  console.log(user);
  const handleMenu = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Login onClick={handleMenu} />
      <AppMenu
        anchorReference="none"
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        className={classes.profile}
      >
        <div>
          <div className={classes.userName}>{user.first_name}</div>
          <div className={classes.userEntity}>{user.entity || "No entity"}</div>
          <div className={classes.userProfile}>{user.ui_profile}</div>
        </div>
        <div className={classes.account}>Account settings</div>
        <div className={classes.logOut} onClick={() => logout()}>
          Logout
        </div>
      </AppMenu>
    </>
  );
};

export default LoginButton;
