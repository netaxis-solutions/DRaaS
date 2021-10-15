import { makeObservable, observable, reaction, runInAction } from "mobx";
import get from "lodash/get";

import { publicLoginRequest, request } from "services/api";
import { homeUrl } from "utils/constants/routes";
import { LoginFormTypes } from "utils/types/authentication";
import { ResponseData } from "utils/types/login";
import PendingQueries from "../PendingQueries";
import RoutingConfig from "../RoutingConfig";
import configStore from "../Config";

class Login {
  user = {} as object;
  level = "";
  constructor() {
    makeObservable(this, {
      user: observable.ref,
      level: observable,
    });

    reaction(
      () => this.level,
      () => {
        console.log("IN REACTION", this.level);
        if (this.level) {
          console.log(homeUrl[this.level], RoutingConfig.availableRouting);
          const route =
            RoutingConfig.availableRouting.find(
              (el) => el["key" as keyof object] === homeUrl[this.level]
            )?.["value" as keyof object]?.["path" as keyof object] || "/";
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
      const level = get(data, "data.ids", "admin");

      const accessToken = get(data, "data.access_token", false);
      const refreshToken = get(data, "data.refresh_token", false);
      level && RoutingConfig.setLoggedUser(level, level);
      this.level = level;
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

    try {
      const data = await request({
        route: "/system/users/local",
      });
      RoutingConfig.setLoggedUser(
        data["data" as keyof object]["ui_profile" as keyof object],
        data["data" as keyof object]["ui_profile" as keyof object]
      );
      runInAction(() => {
        this.user = data["data" as keyof object];
        this.level = data["data" as keyof object]["ui_profile" as keyof object];
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
