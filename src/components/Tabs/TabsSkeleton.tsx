import Skeleton from "@mui/material/Skeleton";
import { Tab } from "utils/types/tabs";

import { skeletonTabsStyles } from "./styles";

const Tabs: React.FC<{ tabs: Array<Tab> }> = ({ tabs = [] }) => {
  const classes = skeletonTabsStyles();
  return (
    <>
      <div className={classes.tabsContainer}>
        {tabs.map(() => (
          <Skeleton
            variant={"rectangular"}
            width={160}
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

export default Tabs;
