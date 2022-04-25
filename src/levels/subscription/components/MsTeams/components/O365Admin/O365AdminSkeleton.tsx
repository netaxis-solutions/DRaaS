import Skeleton from "@mui/material/Skeleton";
import { O365AdminSkeletonStyles } from "./styles";

const O365AdminSkeleton: React.FC = () => {
  const classes = O365AdminSkeletonStyles();
  return (
    <>
      <Skeleton
        variant={"text"}
        width={500}
        height={20}
        className={classes.text}
      />
      <Skeleton
        variant={"rectangular"}
        width={500}
        height={40}
        className={classes.rectangle}
      />

      <Skeleton
        variant={"rectangular"}
        width={500}
        height={40}
        className={classes.rectangle}
      />
      <div className={classes.buttonsWrapper}>
        <Skeleton variant={"rectangular"} width={90} height={36} />
        <Skeleton variant={"rectangular"} width={90} height={36} />
      </div>
    </>
  );
};

export default O365AdminSkeleton;
