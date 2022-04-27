import Skeleton from "@mui/material/Skeleton";
import { useProfileStyles } from "./styles";
import TabsSkeleton from "components/Tabs/TabsSkeleton";

const SubscriptionProfileSkeleton: React.FC = () => {
  const classes = useProfileStyles();
  return (
    <>
      <div className={classes.profileHeaderWrapper}>
        <div className={classes.subscriptionName}>
          <Skeleton variant={"text"} width={220} />
        </div>
        <div className={classes.subscriptionLevel}>
          <Skeleton variant={"text"} width={180} />
        </div>
        <div className={classes.labelContainer}>
          <Skeleton variant={"text"} width={"100%"} />
        </div>
      </div>
      <TabsSkeleton tabsAmount={2} />
    </>
  );
};

export default SubscriptionProfileSkeleton;
