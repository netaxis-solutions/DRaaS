import { makeObservable, observable, reaction, action } from "mobx";

import { menu, MenuType, sidebarLevelMenus } from "utils/constants/menu";
import {
  getLevelRoutes,
  getAvailableRoutes,
} from "utils/functions/routingConfig";
import { historyPush } from "utils/functions/routingConfig/historyPush";

import RoutingStore from "../RoutingConfig";

class Menu {
  activeMenu: string = "";

  setActiveMenu = (menuKey: string) => {
    this.activeMenu = menuKey;
  };

  //GET available routing(filtered from disabled routes and the ones that all sidebar routes are)
  get availableRoutes() {
    return getAvailableRoutes(
      RoutingStore.publicConfigRoutes[
        RoutingStore.loggedInUserLevel as keyof object
      ],
      getLevelRoutes(
        RoutingStore.loggedInUserLevel,
        RoutingStore.loggedInUserLevel
      )
    );
  }

  // Get Top Menu:
  // - set menuBar variable the value that we take with RoutingStore.loggedInUserLevel as key from menu from utils/constants/menu
  // - filter from disabled routes and the ones that all sidebar routes are disabled

  get topMenu() {
    let menuBar: null | object[] = null;
    if (RoutingStore.loggedInUserLevel) {
      menuBar = [...menu[RoutingStore.loggedInUserLevel as keyof MenuType]];
      const filteredMenu = menuBar.filter((el: object) => {
        const route: object | undefined = this.availableRoutes.get(
          el["key" as keyof object]
        )?.["enabled" as keyof object];

        return route;
      });
      menuBar = filteredMenu;
    }
    return menuBar;
  }

  // GET Left menu/sidebar:
  // - check if sidebar is available for the logged in level and current level
  // - set menuBar variable the value that we take with [loggedInLevel][currentLevel] path from sidebarLevelMenus from utils/constants/menu
  // - filter from disabled routes and the ones that all sidebar routes are disabled

  get sidebar() {
    let sideMenu: object[] = [];
    if (RoutingStore.loggedInUserLevel) {
      if (
        sidebarLevelMenus[RoutingStore.loggedInUserLevel as keyof object][
          RoutingStore.currentLevel as keyof object
        ]
      ) {
        let menuBar: object[] = [
          ...sidebarLevelMenus[RoutingStore.loggedInUserLevel as keyof object][
            RoutingStore.currentLevel as keyof object
          ],
        ];
        if (
          menuBar.find(
            (el: object) => el["key" as keyof object] === this.activeMenu
          )
        ) {
          menuBar.forEach((el: object, index: number) => {
            const sidebar: undefined | object[] = RoutingStore.allRouting.get(
              el["key" as keyof object]
            )?.["sidebar" as keyof object];
            sidebar &&
            RoutingStore.allRouting.get(el["key" as keyof object])?.[
              "enabled" as keyof object
            ]
              ? (menuBar[index] = sidebar)
              : menuBar.splice(index, 1);
          });

          sideMenu =
            RoutingStore.loggedInUserLevel !== RoutingStore.currentLevel
              ? [
                  ...sidebarLevelMenus[
                    RoutingStore.loggedInUserLevel as keyof object
                  ][RoutingStore.currentLevel as keyof object],
                ].filter((el) =>
                  RoutingStore.availableRouting.find(
                    (route: object) =>
                      route["key" as keyof object] === el["key" as keyof object]
                  )
                )
              : menuBar;
        }
      }
    }
    return sideMenu.length ? sideMenu : null;
  }

  constructor() {
    makeObservable(this, {
      activeMenu: observable,
      setActiveMenu: action,
    });

    reaction(
      () => this.availableRoutes.size,
      () => {
        historyPush(RoutingStore, this.activeMenu);
      }
    );
  }
}

export default new Menu();
