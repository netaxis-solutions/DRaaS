import { Search, World } from "components/Icons";
import useStyles from "./styles";
import LoginButton from "./IconButtons/Login";
const IconsBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.iconsBarWrapper}>
      <Search />
      <World />
      <LoginButton />
    </div>
  );
};

export default IconsBar;
