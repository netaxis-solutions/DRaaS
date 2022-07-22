import React, { memo, useMemo } from "react";
import menuStore from "storage/singletons/Menu";
import RoutingConfig from "storage/singletons/RoutingConfig";
import { MenuElement } from "utils/types/routingConfig";

import MenuEl from "../MenuEl";

const MenuBlock: React.FC = memo(() => {
  const { topMenu } = menuStore;
  const { setCurrentLevel, loggedInUserLevel } = RoutingConfig;

  const renderList = useMemo(
    () =>
      topMenu.map((menuEl: MenuElement, i: number) => (
        <MenuEl
          key={i}
          menuEl={menuEl}
          onClick={() => setCurrentLevel(loggedInUserLevel)}
        />
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [topMenu],
  );

  if (!topMenu) return <></>;
  return <>{renderList}</>;
});

export default MenuBlock;
