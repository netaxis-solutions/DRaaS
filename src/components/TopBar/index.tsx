import IconsBar from "./components/IconsBar";
import MenuBlock from "./components/MenuBlock";

import useStyles from "./styles";

const TopBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.topbarContainer}>
      <img
        src="/branding/default/img/topBarLogo.png"
        className={classes.topBarLogoImage}
        alt="logo"
      />
      <MenuBlock />
      <IconsBar />
    </div>
  );
};

export default TopBar;
