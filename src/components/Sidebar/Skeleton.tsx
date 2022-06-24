import { FC } from "react";
import Skeleton from "@mui/material/Skeleton";

import { LoggedInUserType } from "utils/types/routingConfig";
import { SidebarUnitType } from "utils/types/routingConfig";

import useStyles from "./styles";

const SidebarSkeleton: FC<{
  currentLevel: LoggedInUserType;
  options: SidebarUnitType[];
}> = ({ currentLevel, options }) => {
  const classes = useStyles({ currentLevel });

  return (
    <>
      <div className={classes.titleWithDropdown}>
        <div className={classes.titleContainer}>
          <div className={classes.iconContainer}>
            <Skeleton variant="circular" width={40} height={40} />
          </div>
          <div className={classes.titleWrapper}>
            <div className={classes.title}>
              <Skeleton width={130} />
            </div>
            <div className={classes.level}>
              <Skeleton width={130} />
            </div>
          </div>
        </div>
      </div>
      {options.map((el: SidebarUnitType) => (
        <div className={classes.sidebarItem} key={el.key}>
          <Skeleton />
        </div>
      ))}
    </>
  );
};

export default SidebarSkeleton;
