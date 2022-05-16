import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { t } from "services/Translation";

import useStyles from "../styles";

type statusType =
  | "active"
  | "deleting"
  | "activating"
  | "activation_error"
  | "deletion_error"
  | "updating"
  | "update_error";

const statuses = {
  active: t("active"),
  deleting: t("deleting"),
  activating: t("activating"),
  updating: t("updating"),
  activation_error: t("activation error"),
  deletion_error: t("deletion error"),
  update_error: t("update_error"),
};

const AssignedNumber: FC<{
  draasUserInfo: {
    [key: string]: any;
    status: statusType;
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
            draasUserInfo.status === "updating" ||
            draasUserInfo.status === "activating",
          [classes.error]:
            draasUserInfo.status === "activation_error" ||
            draasUserInfo.status === "update_error" ||
            draasUserInfo.status === "deletion_error",
        })}
      >
        {statuses[draasUserInfo.status]}
      </div>
    </div>
  ) : (
    <div>{t("no number")}</div>
  );
};

export default AssignedNumber;
