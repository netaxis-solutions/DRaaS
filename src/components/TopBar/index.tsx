import IconsBar from "./components/IconsBar";
import MenuBlock from "./components/MenuBlock";

import useStyles from "./styles";

const TopBar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.topbarContainer}>
      <img
        src="/branding/default/img/TopBarLogo.svg"
        className={classes.topBarLogoImage}
        alt="logo"
      />
      <MenuBlock />
      <IconsBar />
    </div>
  );
};

export default TopBar;
