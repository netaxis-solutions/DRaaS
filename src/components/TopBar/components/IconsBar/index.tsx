import ProfileButton from "./IconButtons/ProfileButton";
import { Search } from "components/Icons";
import LanguageBar from "./LanguageBar";
import useStyles from "./styles";
const IconsBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.iconsBarWrapper}>
      <Search className={classes.icons} />
      <LanguageBar />
      <ProfileButton />
    </div>
  );
};

export default IconsBar;
