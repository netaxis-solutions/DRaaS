import { action, makeObservable, observable, runInAction } from "mobx";
import { History } from "history";
import { publicRoutes } from "utils/constants/routes";
import {
  getLevelRoutes,
  getAvailableRoutes,
} from "utils/functions/routingConfig";
import PendingQueries from "../PendingQueries";

class Routing {
  publicConfigRoutes: object = {};
  history = {} as History;
  currentLevel: string = "";
  loggedInUserLevel: string = "";

  //Get routes with paths for current level from privateRoutes utils/constants/routes
  get levelRoutes() {
    return getLevelRoutes(this.loggedInUserLevel, this.currentLevel);
  }

  // Get all routing for the level you are currently on based on public/configs/default/app.routes.json
  get allRouting() {
    return !!this.levelRoutes.size
      ? getAvailableRoutes(
          this.publicConfigRoutes[this.currentLevel as keyof object],
          this.levelRoutes
        )
      : new Map(Object.entries(publicRoutes));
  }

  //Filter allRouting from the routes that aren't enabled or all sidebar routes aren't enabled
  get availableRouting() {
    const currentLevelRoutingArray: object[] = [];
    for (const [routeName, routeValue] of this.allRouting) {
      if (typeof routeValue === "string") {
        currentLevelRoutingArray.push({
          key: routeName,
          value: { path: routeValue },
        });
      } else {
        routeValue["enabled" as keyof object] &&
          currentLevelRoutingArray.push({ key: routeName, value: routeValue });
      }
    }
    return currentLevelRoutingArray;
  }

  setLoggedUser = (currentLevel: string, loggedInUserLevel: string) => {
    this.currentLevel = currentLevel;
    this.loggedInUserLevel = loggedInUserLevel;
  };

  setCurrentLevel = (currentLevel: string) => {
    this.currentLevel = currentLevel;
  };

  setHistory = (history: History) => {
    this.history = history;
  };

  constructor() {
    makeObservable(this, {
      publicConfigRoutes: observable.ref,
      history: observable.ref,
      loggedInUserLevel: observable,
      currentLevel: observable,
      setLoggedUser: action,
      setHistory: action,
      setCurrentLevel: action,
    });
  }

  getRoutingConfig = async (): Promise<object> => {
    const queryId = PendingQueries.add("@configLoader", null);

    return await fetch("/configs/default/app.routes.json")
      .then((data) => data.json())
      .then((routesConfig: object) => {
        runInAction(() => {
          this.publicConfigRoutes = routesConfig;
          PendingQueries.remove("@configLoader", queryId);
        });
        return this.publicConfigRoutes;
      });
  };
}

export default new Routing();
