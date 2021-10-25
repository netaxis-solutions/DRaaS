import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import clsx from "clsx";

import useStyles from "./styles";

const MenuEl = ({ menuEl }: { menuEl: any }) => {
  const classes = useStyles();
  const location = useLocation();
  const isActive = location.pathname === menuEl.path;

  return (
    <div
      className={clsx(classes.menuElLinkWrapper, {
        [classes.menuElLinkWrapperActive]: isActive,
      })}
    >
      <NavLink
        to={menuEl.path}
        className={classes.menuElLink}
        activeClassName={isActive ? classes.menuElLinkActive : ""}
      >
        {menuEl.name}
      </NavLink>
    </div>
  );
};

export default observer(MenuEl);
