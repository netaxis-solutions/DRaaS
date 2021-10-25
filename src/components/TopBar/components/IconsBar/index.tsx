import { Login, Search, World } from "components/Icons";

import useStyles from "./styles";

const IconsBar = () => {
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
