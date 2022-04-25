import Skeleton from "@mui/material/Skeleton";
import { O365Styles } from "./styles";

const O365TenantSkeleton: React.FC = () => {
  const classes = O365Styles();
  return (
    <div className={classes.root}>
      <div className={classes.list}>
        <span>
          <Skeleton variant={"text"} width={"100%"} height={22} />
          <Skeleton variant={"text"} width={"100%"} height={22} />
        </span>
        <span className={classes.listTitle}>
          <Skeleton variant={"text"} width={"100%"} height={22} />
          <Skeleton variant={"text"} width={"100%"} height={22} />
        </span>
        <span>
          <ul>
            <li>
              <Skeleton variant={"text"} width={"100%"} height={22} />
            </li>
            <li>
              <Skeleton variant={"text"} width={"100%"} height={22} />
            </li>
            <li>
              <Skeleton variant={"text"} width={"100%"} height={22} />
            </li>
          </ul>
          <span>
            <Skeleton variant={"text"} width={"100%"} height={22} />
            <Skeleton variant={"text"} width={"100%"} height={22} />
          </span>
        </span>

        <div>
          <Skeleton
            variant={"rectangular"}
            width={250}
            height={36}
            className={classes.buttonConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default O365TenantSkeleton;
