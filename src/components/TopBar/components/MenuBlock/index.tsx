import menuStore from "storage/singletons/Menu";

import MenuEl from "../MenuEl";

const MenuBlock = () => {
  const { topMenu } = menuStore;

  if (!topMenu) return <></>;
  return (
    <>
      {topMenu.map((menuEl, i) => (
        <MenuEl key={i} menuEl={menuEl} />
      ))}
    </>
  );
};

export default MenuBlock;
