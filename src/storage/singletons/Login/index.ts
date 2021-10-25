import { makeObservable, observable, reaction, runInAction } from "mobx";
import get from "lodash/get";

import { publicLoginRequest, request } from "services/api";
import { homeUrl } from "utils/constants/routes";
import { LoginFormTypes } from "utils/types/authentication";
import { LoggedInUserType } from "utils/types/routingConfig";
import { ResponseData } from "utils/types/login";
import PendingQueries from "../PendingQueries";
import RoutingConfig from "../RoutingConfig";
import configStore from "../Config";

class Login {
  user = {} as object;
  level = "" as LoggedInUserType;

  constructor() {
    makeObservable(this, {
      user: observable.ref,
      level: observable,
    });

    reaction(
      () => this.level,
      () => {
        if (this.level) {
          const routeVal = RoutingConfig.availableRouting.find(
            (el) => el.key === homeUrl[RoutingConfig.currentLevel]
          );

          const route = routeVal?.value?.path || "/";
          RoutingConfig.history.push(route);
        }
      }
    );
  }

  login = async (payload: LoginFormTypes): Promise<void> => {
    const queryId = PendingQueries.add("@loginLoader", null);

    try {
      const data: ResponseData | void = await publicLoginRequest({
        payload,
        method: "post",
        route: "auth/login",
      });

      const accessToken = get(data, "data.access_token", false);
      const refreshToken = get(data, "data.refresh_token", false);

      accessToken &&
        localStorage.setItem(
          `${configStore.config.name}_accessToken`,
          accessToken
        );

      refreshToken &&
        localStorage.setItem(
          `${configStore.config.name}_refreshToken`,
          refreshToken
        );
      this.getUserData();
    } catch (e) {
    } finally {
      runInAction(() => {
        PendingQueries.remove("@loginLoader", queryId);
      });
    }
  };

  getUserData: () => Promise<void> = async () => {
    const queryId = PendingQueries.add("@getUserDataLoader", null);

    type RoutingConfigType = {
      data: { ui_profile: LoggedInUserType; [key: string]: string };
    };

    try {
      const data: RoutingConfigType = await request({
        route: "/system/users/local",
      });
      const level = data.data.ui_profile;

      RoutingConfig.setLoggedUser(level, level);

      runInAction(() => {
        this.user = data.data;
        this.level = level;
      });
    } catch {
    } finally {
      runInAction(() => {
        PendingQueries.remove("@getUserDataLoader", queryId);
      });
    }
  };
}

export default new Login();
