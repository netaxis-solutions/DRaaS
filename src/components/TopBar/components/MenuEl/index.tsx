import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import clsx from "clsx";

import useStyles from "./styles";
import { MenuElement } from "utils/types/routingConfig";

type MenuELType = {
  menuEl: MenuElement;
  onClick: () => void;
};

const MenuEl: React.FC<MenuELType> = ({ menuEl, onClick }) => {
  const classes = useStyles();
  const location = useLocation();
  const isActive = location.pathname === menuEl.path;

  return menuEl?.path ? (
    <div
      className={clsx(classes.menuElLinkWrapper, {
        [classes.menuElLinkWrapperActive]: isActive,
      })}
    >
      <NavLink
        onClick={onClick}
        to={menuEl?.path}
        className={classes.menuElLink}
        activeClassName={isActive ? classes.menuElLinkActive : ""}
      >
        {menuEl.name}
      </NavLink>
    </div>
  ) : null;
};

export default observer(MenuEl);
