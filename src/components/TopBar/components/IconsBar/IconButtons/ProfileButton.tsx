import { useState } from "react";
import AppMenu from "@material-ui/core/Menu";
import { useTranslation } from "react-i18next";

import LoginStore from "storage/singletons/Login";
import RoutingConfig from "storage/singletons/RoutingConfig";

import AccountInfo from "./components/AccountModal/AccountInfo";
import PasswordModal from "./components/PasswordModal/ChangePassword";
import RightSideModal from "components/Modal/RightSideModal";
import { StrokeUserProfile } from "components/Icons";

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
      <StrokeUserProfile onClick={handleMenu} className={classes.icons} />
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
          <div className={classes.userProfile}>
            {user.admin_of && user?.admin_of[0]?.level}
          </div>
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
        {loggedInUserLevel === "system" && (
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
        <RightSideModal
          handleCancel={() => setModal("")}
          title={t("Account information")}
          children={<AccountInfo formId={"accountSettings"} />}
          submitButton={{
            formId: "accountSettings",
            type: "submit",
          }}
        />
      )}
      {modalToOpen === "changePassword" && (
        <RightSideModal
          handleCancel={() => setModal("")}
          title={t("Account information")}
          children={<PasswordModal formId={"changePassword"} />}
          submitButton={{
            formId: "changePassword",
            type: "submit",
          }}
        />
      )}
    </>
  );
};

export default ProfileButton;
