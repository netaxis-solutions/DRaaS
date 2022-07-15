import React, { memo, useMemo } from "react";
import menuStore from "storage/singletons/Menu";
import RoutingConfig from "storage/singletons/RoutingConfig";
import { MenuElement } from "utils/types/routingConfig";

import MenuEl from "../MenuEl";

const MenuBlock: React.FC = memo(() => {
  const { topMenu } = menuStore;
  const { setCurrentLevel, loggedInUserLevel } = RoutingConfig;

  const TopMenuList = useMemo(() => topMenu, [topMenu]);

  if (!TopMenuList) return <></>;
  return (
    <>
      {TopMenuList.map((menuEl: MenuElement, i: number) => (
        <MenuEl
          key={i}
          menuEl={menuEl}
          onClick={() => setCurrentLevel(loggedInUserLevel)}
        />
      ))}
    </>
  );
});

export default MenuBlock;
