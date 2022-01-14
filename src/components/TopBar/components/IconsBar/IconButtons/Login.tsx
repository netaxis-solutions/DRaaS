import { useState } from "react";
import { useTranslation } from "react-i18next";
import AppMenu from "@material-ui/core/Menu";

import LoginStore from "storage/singletons/Login";

import { Login } from "components/Icons";
import AccountModal from "./components/AccountModal";

import useStyles from "../styles";

const LoginButton: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [isModalOpened, setModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { user, logout } = LoginStore;

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
        <div className={classes.account} onClick={() => setModal(true)}>
          {t("Account settings")}
        </div>
        <div className={classes.logOut} onClick={() => logout()}>
          {t("Logout")}
        </div>
      </AppMenu>
      {isModalOpened && (
        <AccountModal
          handleCancel={() => {
            setModal(false);
          }}
        />
      )}
    </>
  );
};

export default LoginButton;
