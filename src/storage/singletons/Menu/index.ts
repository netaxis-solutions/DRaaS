import get from "lodash/get";

// import Login from "../Login";
import RoutingStore from "../RoutingConfig";
import { menu, sidebarLevelMenus } from "utils/constants/menu";
import {
  getLevelRoutes,
  getAvailableRoutes,
} from "utils/functions/routingConfig";
import {
  CurRoute,
  MenuElement,
  RouteValueType,
  SidebarUnitType,
} from "utils/types/routingConfig";

class Menu {
  //GET available routing(filtered from disabled routes and the ones that all sidebar routes are)
  get availableRoutes() {
    const routes: Map<string, RouteValueType> = getAvailableRoutes(
      RoutingStore.publicConfigRoutes[RoutingStore.loggedInUserLevel],
      getLevelRoutes(
        RoutingStore.loggedInUserLevel,
        RoutingStore.loggedInUserLevel,
      ),
    );
    return routes;
  }

  // Get Top Menu:
  // - set menuBar variable the value that we take with RoutingStore.loggedInUserLevel as key from menu from utils/constants/menu
  // - filter from disabled routes and the ones that all sidebar routes are disabled

  get topMenu() {
    let menuBar: Array<MenuElement> = [];
    if (RoutingStore.loggedInUserLevel) {
      menuBar = [...menu[RoutingStore.loggedInUserLevel]];

      console.log("MENUBAR", menuBar, "MENU", menu);

      const filteredMenu = menuBar?.reduce(
        (prev: Array<MenuElement>, el: MenuElement) => {
          const menuEl: RouteValueType | undefined = this.availableRoutes.get(
            el.key,
          );

          if (menuEl?.enabled) {
            prev.push({ ...el, path: menuEl.path });
          }

          return prev;
        },
        [],
      );
      menuBar = filteredMenu;
      console.log("FILTERED MENU", filteredMenu);
    }
    return menuBar;
  }

  // GET Left menu/sidebar:
  // - check if sidebar is available for the logged in level and current level
  // - set menuBar variable the value that we take with [loggedInLevel][currentLevel] path from sidebarLevelMenus from utils/constants/menu
  // - filter from disabled routes and the ones that all sidebar routes are disabled

  get sidebar() {
    let sideMenu: SidebarUnitType[] = [];
    if (
      RoutingStore.loggedInUserLevel &&
      RoutingStore.loggedInUserLevel !== "tenant" &&
      sidebarLevelMenus[RoutingStore.loggedInUserLevel]
    ) {
      const menuArr = get(
        sidebarLevelMenus[RoutingStore.loggedInUserLevel],
        RoutingStore.currentLevel,
        null,
      );
      if (menuArr) {
        let menuBar: SidebarUnitType[] = [...menuArr];

        //TO DO LOGIC FOR TABS!!
        // menuBar.forEach((el: object, index: number) => {
        //   const sidebar: undefined | object[] = RoutingStore.allRouting.get(
        //     el["key" as keyof object]
        //   )?.["sidebar" as keyof object];
        //   sidebar &&
        //   RoutingStore.allRouting.get(el["key" as keyof object])?.[
        //     "enabled" as keyof object
        //   ]
        //     ? (menuBar[index] = sidebar)
        //     : menuBar.splice(index, 1);
        // });

        sideMenu =
          RoutingStore.loggedInUserLevel !== RoutingStore.currentLevel
            ? [...menuArr].filter((el: CurRoute) => {
                return RoutingStore.availableRouting.find(
                  (route: CurRoute) => route.key === el.key,
                );
              })
            : // UNCOMMENT WHEN api_rules WORK FINE!!!!!!!
              // .reduce((prev, cur) => {
              //   Login.userRights.forEach((rule: any) => {
              //     if (rule.name === cur.rule) {
              //       prev.push(cur);
              //     }
              //   });
              //   return prev;
              // }, [])
              menuBar;
      }
    }

    return sideMenu.length ? sideMenu : null;
  }
}

export default new Menu();
