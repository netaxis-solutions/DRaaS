import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import useStyles from "../styles";

const AssignedNumber: FC<{
  draasUserInfo: {
    [key: string]: any;
    status:
      | "active"
      | "deleting"
      | "activating"
      | "activation_error"
      | "deletion_error";
  };
}> = ({ draasUserInfo }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return draasUserInfo && draasUserInfo?.phoneNumber ? (
    <div className={classes.numberWithLabel}>
      <div>{draasUserInfo.phoneNumber}</div>
      <div
        className={clsx([classes.label], {
          [classes.active]: draasUserInfo.status === "active",
          [classes.updating]:
            draasUserInfo.status === "deleting" ||
            draasUserInfo.status === "activating",
          [classes.error]:
            draasUserInfo.status === "activation_error" ||
            draasUserInfo.status === "deletion_error",
        })}
      >
        {t(draasUserInfo.status)}
      </div>
    </div>
  ) : (
    <div>{t("no number")}</div>
  );
};

export default AssignedNumber;
