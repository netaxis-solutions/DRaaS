import clsx from "clsx";
import { FC } from "react";

import useStyles from "../styles";

const AssignedNumber: FC<{
  draasUserInfo: {
    [key: string]: any;
    status: "active" | "updating" | "error";
  };
}> = ({ draasUserInfo }) => {
  const classes = useStyles();
  return draasUserInfo && draasUserInfo?.phoneNumber ? (
    <div className={classes.numberWithLabel}>
      <div>{draasUserInfo.phoneNumber}</div>
      <div className={clsx([classes.label], [classes[draasUserInfo.status]])}>
        {draasUserInfo.status}
      </div>
    </div>
  ) : (
    <div>no phonenumber</div>
  );
};

export default AssignedNumber;
