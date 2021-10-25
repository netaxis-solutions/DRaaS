import React from "react";
import menuStore from "storage/singletons/Menu";
import { MenuElement } from "utils/types/routingConfig";

import MenuEl from "../MenuEl";

const MenuBlock: React.FC = () => {
  const { topMenu } = menuStore;

  if (!topMenu) return <></>;
  return (
    <>
      {topMenu.map((menuEl: MenuElement, i: number) => (
        <MenuEl key={i} menuEl={menuEl} />
      ))}
    </>
  );
};

export default MenuBlock;
