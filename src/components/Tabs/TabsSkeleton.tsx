import Skeleton from "@mui/material/Skeleton";

import { skeletonTabsStyles } from "./styles";

const TabsSkeleton: React.FC<{ tabsAmount: number }> = ({ tabsAmount = 3 }) => {
  const classes = skeletonTabsStyles();
  const tabs = new Array(tabsAmount).fill(true);

  return (
    <>
      <div className={classes.tabsContainer}>
        {tabs.map(() => (
          <Skeleton
            variant={"rectangular"}
            width={100}
            height={40}
            className={classes.tab}
          />
        ))}
      </div>
      <Skeleton
        variant={"rectangular"}
        width={"100%"}
        height={1}
        style={{ borderRadius: "6px 6px 0 0" }}
      />
    </>
  );
};

export default TabsSkeleton;
