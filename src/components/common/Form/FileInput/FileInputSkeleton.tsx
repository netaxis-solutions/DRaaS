import Skeleton from "@mui/material/Skeleton";

import fileInputStyles from "./styles";

const Tabs: React.FC = () => {
  const classes = fileInputStyles();

  return (
    <div className={classes.fileCard}>
      <div className={classes.fileCardHeader}>
        <Skeleton width={"30%"} />
      </div>
      <div className={classes.fileCardDescription}>
        <Skeleton />
        <Skeleton />
      </div>
      <br />
      <div className={classes.uploadButton}>
        <Skeleton variant={"rectangular"} width={80} height={20} />
      </div>
    </div>
  );
};

export default Tabs;
