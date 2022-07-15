import { NavLink } from "react-router-dom";
import { useLocation } from "react-router";
import clsx from "clsx";

import useStyles from "./styles";
import { MenuElement } from "utils/types/routingConfig";
import { memo, useMemo } from "react";

type MenuELType = {
  menuEl: MenuElement;
  onClick: () => void;
};

const MenuEl: React.FC<MenuELType> = memo(({ menuEl, onClick }) => {
  const classes = useStyles();
  const location = useLocation();

  const isActive = useMemo(() => location.pathname === menuEl.path, [location]);

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
      <div className={classes.activeMenu} />
    </div>
  ) : null;
});

export default MenuEl;
