import { Login, Search, World } from "components/Icons";

import useStyles from "./styles";

const IconsBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.iconsBarWrapper}>
      <Search />
      <World />
      <Login />
    </div>
  );
};

export default IconsBar;
