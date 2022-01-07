import { Search, World } from "components/Icons";
import ProfileButton from "./IconButtons/Login";

import useStyles from "./styles";
const IconsBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.iconsBarWrapper}>
      <Search />
      <World />
      <ProfileButton />
    </div>
  );
};

export default IconsBar;
