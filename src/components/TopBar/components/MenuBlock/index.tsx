import React from "react";
import menuStore from "storage/singletons/Menu";
import RoutingConfig from "storage/singletons/RoutingConfig";
import { MenuElement } from "utils/types/routingConfig";

import MenuEl from "../MenuEl";

const MenuBlock: React.FC = () => {
  const { topMenu } = menuStore;
  const { setCurrentLevel, loggedInUserLevel } = RoutingConfig;

  if (!topMenu) return <></>;

  console.log("TOPMENU", topMenu);

  return (
    <>
      {topMenu.map((menuEl: MenuElement, i: number) => (
        <MenuEl
          key={i}
          menuEl={menuEl}
          onClick={() => setCurrentLevel(loggedInUserLevel)}
        />
      ))}
    </>
  );
};

export default MenuBlock;
