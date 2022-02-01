import { useState } from "react";
import AppMenu from "@material-ui/core/Menu";
import { useTranslation } from "react-i18next";

import LoginStore from "storage/singletons/Login";
import RoutingConfig from "storage/singletons/RoutingConfig";

import { Login } from "components/Icons";
import AccountModal from "./components/AccountModal";
import PasswordModal from "./components/PasswordModal";

import useStyles from "../styles";

const ProfileButton: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalToOpen, setModal] = useState("");

  const { history, loggedInUserLevel } = RoutingConfig;
  const { user, logout } = LoginStore;

  const handleMenu = (e: any) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (modalName: string) => {
    setModal(modalName);
    handleCloseMenu();
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
          <div className={classes.userEntity}>
            {user.entity || t("No entity")}
          </div>
          <div className={classes.userProfile}>{user.ui_profile}</div>
        </div>
        <div
          className={classes.account}
          onClick={() => handleMenuItemClick("accountSettings")}
        >
          {t("Profile")}
        </div>
        <div
          className={classes.account}
          onClick={() => handleMenuItemClick("changePassword")}
        >
          {t("Change password")}
        </div>
        {loggedInUserLevel === "draas_system_admin" && (
          <div
            className={classes.account}
            onClick={() => history.push("/info")}
          >
            {t("Version info")}
          </div>
        )}
        <div className={classes.logOut} onClick={() => logout()}>
          {t("Logout")}
        </div>
      </AppMenu>
      {modalToOpen === "accountSettings" && (
        <AccountModal handleCancel={() => setModal("")} />
      )}
      {modalToOpen === "changePassword" && (
        <PasswordModal handleCancel={() => setModal("")} />
      )}
    </>
  );
};

export default ProfileButton;
