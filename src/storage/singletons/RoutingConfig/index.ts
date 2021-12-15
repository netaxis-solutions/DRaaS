import { action, makeObservable, observable, runInAction } from "mobx";
import { History } from "history";
import { publicRoutes } from "utils/constants/routes";
import {
  getLevelRoutes,
  getAvailableRoutes,
  getALlPossibleUrls,
} from "utils/functions/routingConfig";
import {
  CurRoute,
  LoggedInUserType,
  RoutingConfigType,
} from "utils/types/routingConfig";
import PendingQueries from "../PendingQueries";

class Routing {
  publicConfigRoutes = {} as RoutingConfigType;
  history = {} as History;
  currentLevel = "" as LoggedInUserType;
  loggedInUserLevel = "" as LoggedInUserType;

  //Get routes with paths for current level from privateRoutes utils/constants/routes
  get levelRoutes() {
    return getLevelRoutes(this.loggedInUserLevel, this.currentLevel);
  }

  //Get routes with paths for LOGGED IN level from publicConfigRoutes utils/constants/routes
  get allAvailvableRouting() {
    if (this.loggedInUserLevel) {
      return getALlPossibleUrls({
        publicConfigRoutes: this.publicConfigRoutes,
        loggedInUserLevel: this.loggedInUserLevel,
      });
    } else return {};
  }
  // Get all routing for the level you are currently on based on public/configs/default/app.routes.json
  get allRouting() {
    return !!this.levelRoutes.size
      ? getAvailableRoutes(
          this.publicConfigRoutes[this.currentLevel],
          this.levelRoutes,
        )
      : new Map(Object.entries(publicRoutes));
  }

  //Filter allRouting from the routes that aren't enabled or all sidebar routes aren't enabled
  get availableRouting() {
    const currentLevelRoutingArray: CurRoute[] = [];
    for (const [routeName, routeValue] of this.allRouting) {
      if (typeof routeValue === "string") {
        currentLevelRoutingArray.push({
          key: routeName,
          value: { path: routeValue },
        });
      } else {
        routeValue.enabled &&
          currentLevelRoutingArray.push({ key: routeName, value: routeValue });
      }
    }
    return currentLevelRoutingArray;
  }

  setLoggedUser = (
    currentLevel: LoggedInUserType,
    loggedInUserLevel: LoggedInUserType,
  ) => {
    this.currentLevel = currentLevel;
    this.loggedInUserLevel = loggedInUserLevel;
  };

  setCurrentLevel = (currentLevel: LoggedInUserType) => {
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

  getRoutingConfig = async (): Promise<RoutingConfigType> => {
    const queryId = PendingQueries.add("@routingLoader", null);

    return await fetch("/configs/default/app.routes.json")
      .then(data => data.json())
      .then((routesConfig: RoutingConfigType) => {
        runInAction(() => {
          this.publicConfigRoutes = routesConfig;
          PendingQueries.remove("@routingLoader", queryId);
        });
        return this.publicConfigRoutes;
      });
  };
}

export default new Routing();
