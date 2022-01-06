import { World } from "components/Icons";
import ProfileButton from "./IconButtons/ProfileButton";

import { Login, Search } from "components/Icons";
import LanguageBar from "./LanguageBar";
import useStyles from "./styles";
const IconsBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.iconsBarWrapper}>
      <Search />
      <World />
      <ProfileButton />
      <LanguageBar />
      <Login />
    </div>
  );
};

export default IconsBar;
