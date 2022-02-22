import clsx from "clsx";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import useStyles from "../styles";

const AssignedNumber: FC<{
  draasUserInfo: {
    [key: string]: any;
    status: "active" | "updating" | "error";
  };
}> = ({ draasUserInfo }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return draasUserInfo && draasUserInfo?.phoneNumber ? (
    <div className={classes.numberWithLabel}>
      <div>{draasUserInfo.phoneNumber}</div>
      <div className={clsx([classes.label], [classes[draasUserInfo.status]])}>
        {t(draasUserInfo.status)}
      </div>
    </div>
  ) : (
    <div>{t("no number")}</div>
  );
};

export default AssignedNumber;
